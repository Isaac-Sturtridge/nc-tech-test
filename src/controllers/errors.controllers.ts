export async function handleNotFoundError(req, res, next): Promise<any> {
    return res.status(404).send({msg: 'Not Found'})
}

export async function handleServerErrors(req, res, next): Promise<any> {
    return res.status(500).send({msg: 'Internal Server Error'})
}