import prisma from "@/lib/db";

export async function POST(request:Request) {
    const{name,email,clerk_id}=await request.json();

    if (!name || !email || !clerk_id) {
        return Response.json({error:'Missing required field'},{status:401})
    }
    try {
        const response= await prisma.user.create({
            data:{
                name,
                email,
                clerk_id
            }
        })
        console.log('response is ',response);
        return Response.json({message:'User is created in database'},{status:202})
        
    } catch (error) {
        console.log('unable to create user error is ',error)
        return Response.json({error:'Unable to create user in Database'},{status:400})
    }
}