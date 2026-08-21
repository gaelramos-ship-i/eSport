const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const validator = require('validator')

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = '364d'

const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    })
}

/* US1 : Création de compte
En tant que nouveau participant, je veux pouvoir créer un compte avec email et mot de
passe, afin de pouvoir rejoindre des équipes et participer à la plateforme. */

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        if(!name || !email || !password){
            return res.status(400).json({ message: 'Please provide name, email and password'})
        }

        const isPasswordOK = validator.isStrongPassword(password, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })

        if(!isPasswordOK){
            return res.status(400).json({ message: 'Password must have 1 lower, 1 upper, 1 number and 1 symbol and must be at least 6 characters long'})
        }

        const isEmailOK = validator.isEmail(email)

        if(!isEmailOK){
            return res.status(400).json({ message: 'You must provide a valid email'})
        }

        const existingUser = await User.findOne({ email })
        if(existingUser){
            return res.status(400).json({ message: 'Email already in use' })
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'player'
        })

        const token = generateToken(user._id)

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
    } catch (err) {
        res.status(500).json({ message: 'Server error during registration', error: err.message})
    }
}

/* US2 : Connexion
En tant qu’utilisateur enregistré, je veux pouvoir me connecter avec mon email et mot de
passe, afin d’accéder à mes fonctionnalités personnalisées. */

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if(!email || !password){
            return res.status(400).json({ message: 'Please provide email and password'})
        }

        const user = await User.findOne({ email }).select('+password')
        if(!user){
            return res.status(401).json({ message: 'Invalid credentials'})
        }

        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(401).json({ message: 'Invalid credentials'})
        }

        const token = generateToken(user._id)

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
    } catch (err) {
        res.status(500).json({ message: 'Server error during login', error: err.message})
    }
}

/* US4 : Modifier mon profil
En tant qu’utilisateur, je veux pouvoir modifier mes informations personnelles, afin de garder
mon profil à jour. */

const updateProfil = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if(user == null){
            return res.status(404).json({message: "Utilisateur non trouvé"})
        }

        if(req.body.name != null){
            user.name = req.body.name
        }

        if(req.body.email != null){
            user.email = req.body.email
        }

        const updateUser = await user.save()
        res.json(updateUser)
        
    } catch (err) {
        res.status(500).json({ message: 'Server error during update profil', error: err.message})
    }
}

/* US16 : Gérer les rôles utilisateurs
En tant qu’administrateur, je veux attribuer ou modifier les rôles (joueur, capitaine,
organisateur, admin), afin de contrôler les permissions. */

const updateRoles = async (req, res) => {
    try {

        const { idUser } = req.params

        const user = await User.findById(idUser)
        if(user == null){
            return res.status(404).json({message: "Utilisateur non trouvé"})
        }

        if(req.body.role != null){
            user.role = req.body.role
        }

        const updateUser = await user.save()
        res.json(updateUser)
        
    } catch (err) {
        res.status(500).json({ message: 'Server error during update role', error: err.message})
    }
}



module.exports = { register, login, updateProfil, updateRoles }