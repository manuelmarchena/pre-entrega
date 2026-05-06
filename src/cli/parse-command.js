
export const inputParser = (inputRequest) =>{

    const [method, resource, ...bodyArguments] = inputRequest
    const [resourceName, resourceId] = (resource ?? "").split("/")
    
    return {
        method,
        resource,
        resourceName,
        resourceId,
        bodyArguments
    }

}
