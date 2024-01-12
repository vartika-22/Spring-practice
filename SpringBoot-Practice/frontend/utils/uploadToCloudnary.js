const cloud_name="dcosxwnmq";
const upload_preset="social_app"


export const uploadToCloudnary=async(file,fileType)=>{

    if(file&& fileType){

        const data= new FormData();
        data.append("file",file);
        data.append("upload_preset",upload_preset);
        data.append("cloud_name",cloud_name)

        const res=await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
        {method:"post",body:data}
        );
        console.log("response",res);
        const fileData=await res.json();
        console.log("file-data: ",fileData.url);
        return fileData.url;
    }
}