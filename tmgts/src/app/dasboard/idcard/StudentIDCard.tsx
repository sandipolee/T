import Image from 'next/image'

interface StudentIDCardProps {
  name: string
  studentId: string
  class: string
  dob: string
  address: string
  transportLocation: string
  validity: string
  photoUrl: string
}

export function StudentIDCard({
  name,
  studentId,
  class: studentClass,
  dob,
  address,
  transportLocation,
  validity,
  photoUrl
}: StudentIDCardProps) {
  return (
    <div className="w-[486px] h-[306px] border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg flex flex-col">
      <div className="bg-blue-900 text-white text-center py-2 text-lg font-bold">
        TRANSPORT ID
      </div>

      <div className="flex p-2 h-[200px]">
        <div className="">
          <Image
            src={photoUrl}
            alt={`${name}'s Photo`}
            width={97}
            height={114}
            className="ml-3 border-3 border-blue-900 rounded-md object-cover"
          />
          <div className="font-bold text-blue-900 uppercase ml-2 mt-2 max-w-[140px]">{name}</div>
        </div>
        <div className="ml-10 mt-2 text-sm leading-tight space-y-1">
          <div>
            <strong>Student Id No:</strong> {studentId}
          </div>
          <div>
            <strong>Class:</strong> {studentClass}
          </div>
          <div>
            <strong>Date Of Birth:</strong> {dob}
          </div>
          <div>
            <strong>Address:</strong> {address}
          </div>
          <div>
            <strong>Transport Location:</strong> {transportLocation}
          </div>
          <div>
            <strong>Validity:</strong> {validity}
          </div>
        </div>
      </div>
      <div className="bg-blue-900 text-white text-center py-1 text-sm">
        <div className="flex justify-center items-center">
          <Image
            src="/idcardschoollogo.png"
            alt="School Logo"
            width={56}
            height={56}
            className="mr-7"
          />
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