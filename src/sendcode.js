import API from "../backendApi";

export default function joinMeeting(data){
    return API.post("/meetinglogin",data).then(res=>{
        let template ={
            emotions:res.emotionsselected,
            questions:res.questions
        }
        return{
            meetingid:res.meetingid,
            companyid:res.companyid,
            template:template
        }
    }).catch(err=>{
        throw err
    })
}