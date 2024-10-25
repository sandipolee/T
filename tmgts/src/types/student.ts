export interface Student {
    registerID: string;
    name: string;
    mobileNum: string;
    parentsphone: string;
    gender: 'Male' | 'Female' | 'Other';
    dob: Date;
    studentClass: string;
    course: string;
    address?: string;
    transportLocation?: string;
}   
export const students: Student[] = [
    {
        registerID: "1",
        name: "John Doe",
        mobileNum: "1234567890",
        parentsphone: "1234567890",
        gender: "Male",
        dob: new Date("2000-01-01"),
        studentClass: "10th",
        course: "Science",
    },
    {
        registerID: "2",
        name: "Jane Doe",
        mobileNum: "1234567890",
        parentsphone: "1234567890",
        gender: "Female",
        dob: new Date("2000-01-01"),                
        studentClass: "10th",
        course: "Science",
    },
]   

