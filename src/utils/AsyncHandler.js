export const AsyncHandler = (reqFn) => {
    return async (req,res,next) => {
        try {
            await reqFn(req,res,next)
        } catch (err) {
            next(err)
        }
    }
}