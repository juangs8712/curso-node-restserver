import { response, request } from "express";

export const usuariosGet = (req = request, res = response) => {
    const { q, nombre, apikey } = req.query;

    res.json({
        msg: 'get API - controlador',
        q, nombre, apikey
    })
}

export const usuariosPut = (req, res = response) => {
    const { id } = req.params;

    res.json({
        msg: 'put API - controlador',
        id
    })
}
export const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: 'post API - controlador',
        nombre,
        edad
    })
}
export const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    })
}
export const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    })
}