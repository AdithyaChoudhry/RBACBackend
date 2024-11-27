    import User from "../models/UserModel.js";
    import argon2 from "argon2";

    export const getUsers = async(req, res) => {
        try {
            const response = await User.findAll({
                attributes: ['uuid', 'name', 'email', 'role']
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }

    export const getUserById = async(req, res) => {
        try {
            const response = await User.findOne({
                attributes: ['uuid', 'name', 'email', 'role'],
                where: {
                    uuid: req.params.id
                }
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }

    export const createUser = async(req, res) => {
        console.log("Request Body:", req.body);

        const { name, email, password, confPassword, role } = req.body;

        if (!name || !email || !password || !confPassword || !role) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        if (password !== confPassword) {
            return res.status(400).json({ msg: "Password and Confirm Password do not match" });
        }

        try {
            if (typeof password !== 'string' || !password.trim()) {
                return res.status(400).json({ msg: "Password cannot be empty" });
            }
            const hashPassword = await argon2.hash(password);

            await User.create({
                name: name,
                email: email,
                password: hashPassword,
                role: role
            });

            res.status(201).json({ msg: "Registration Successful" });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    }



    export const updateUser = async(req, res) => {
        const user = await User.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!user) return res.status(404).json({ msg: "user not found" });
        const { name, email, password, confPassword, role } = req.body;
        let hashPassword;
        if (password === "" || password === null) {
            hashPassword = user.password
        } else {
            hashPassword = await argon2.hash(password);
        }
        if (password !== confPassword) return res.status(400).json({ msg: "Password and confirmpassword do not match" });
        try {
            await User.update({
                name: name,
                email: email,
                password: hashPassword,
                role: role
            }, {
                where: {
                    id: user.id
                }
            });
            res.status(200).json({ msg: "User Updated" });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    }

    export const deleteUser = async(req, res) => {
        const user = await User.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!user) return res.status(404).json({ msg: "user not found" });
        try {
            await User.destroy({
                where: {
                    id: user.id
                }
            });
            res.status(200).json({ msg: "User Deleted" });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    }