import Image from 'next/image'
import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface StudentIDCardProps {
  name: string
  registerID: string
  studentClass: string
  travellinglocation: string
  travellingstartdate: Date
  profilePic: string
}

export function StudentIDCard({
  name,
  registerID,
  studentClass,
  travellinglocation,
  travellingstartdate,
  profilePic
}: StudentIDCardProps) {
  return (
    <div className="w-[486px] h-[306px] border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg flex flex-col">
      <div className="bg-blue-900 text-white text-center py-2 text-lg font-bold">
        TRANSPORT ID
      </div>

      <div className="flex p-2 h-[200px]">
        <div className="">
          <Avatar className="w-[97px] h-[114px] ml-3 rounded-md">
            <AvatarImage 
              src={profilePic} 
              alt={`${name}'s Photo`}
              className="object-cover border-3 border-blue-900"
            />
          </Avatar>
          <div className="font-bold text-blue-900 uppercase ml-2 mt-2 max-w-[140px]">{name}</div>
        </div>
        <div className="ml-10 mt-2 text-sm leading-tight space-y-1">
          <div>
            <strong>Student Id No:</strong> {registerID}
          </div>
          <div>
            <strong>Class:</strong> {studentClass}
          </div>
          <div>
            <strong>Transport Location:</strong> {travellinglocation}
          </div>
          <div>
            <strong>Validity:</strong> {
              travellingstartdate instanceof Date
                ? travellingstartdate.toLocaleDateString()
                : String(travellingstartdate)
            }
          </div>
        </div>
      </div>
      <div className="bg-blue-900 text-white text-center py-1 text-sm">
        <div className="flex justify-center items-center">
          <Avatar className="mr-7 w-14 h-14">
            <AvatarImage src="/idcardschoollogo.png" alt="School Logo" />
          </Avatar>
          <div>
            <h1 className="font-bold text-base">
              GYAN JOTI SECONDARY SCHOOL
            </h1>
            <p>Tulsipur-06 Dang</p>
            <p>082520955, 521773</p>
          </div>
        </div>
      </div>
    </div>
  )
}
