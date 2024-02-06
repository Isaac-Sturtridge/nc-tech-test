export async function handleNotFoundError(req, res, next): Promise<any> {
    return res.status(404).send({msg: 'Not Found'})
}

export async function handleCustomErrors(err, req, res, next): Promise<any> {
    if(err.status) {
        res.status(err.status).send({msg: err.msg})
    } else {
        next(err)
    }
}

export async function handleServerErrors(err, req, res, next): Promise<any> {
    return res.status(500).send({msg: 'Internal Server Error'})
}