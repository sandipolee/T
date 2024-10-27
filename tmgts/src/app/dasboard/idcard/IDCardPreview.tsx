import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { StudentIDCard } from "./StudentIDCard";
import jsPDF from "jspdf"
import { toPng } from 'html-to-image';

export type IStudent = {
  _id: string;
  profilePic: string;
  name: string;
  registerID: string;
  studentClass: string;
  course: string;
  travellinglocation: string;
  travellingstartdate: Date;
  fathersname: string;
};

interface IDCardPreviewProps {
  selectedStudents: IStudent[];
  onBack: () => void;
}

export function IDCardPreview({ selectedStudents, onBack }: IDCardPreviewProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = async () => {
    const element = printRef.current;
    if (!element || selectedStudents.length === 0) return;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const cardsPerPage = 5;
    const margin = 5;
    const cardWidth = (205.74  - 3 * margin) / 2;
    const cardHeight = (129.54   - 3 * margin) / 2;
    console.log(selectedStudents.length);
    for (let i = 0; i < selectedStudents.length; i++) {
      if (i > 0 && i % cardsPerPage === 0) {
        pdf.addPage();
      }

      const cardElement = element.children[i] as HTMLElement;
      const cardImage = await toPng(cardElement, { quality: 4 });

      const col = i % 2;
      const row = Math.floor((i % cardsPerPage) / 2);

      const x = margin + col * (cardWidth + margin);
      const y = margin + row * (cardHeight + margin);

      pdf.addImage(cardImage, 'PNG', x, y, cardWidth, cardHeight);

    }

    
    pdf.save("fancy-id-cards.pdf");
  };

  if (selectedStudents.length === 0) {
    return <div>No students selected</div>;
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Button onClick={onBack}>Back</Button>
        <Button onClick={handlePrint}>Print</Button>
      </div>

      <div className="flex justify-center">
        <div ref={printRef} className="printable-area">
          {selectedStudents.map((student) => (
            <StudentIDCard key={student._id} {...student} />
          ))}
        </div>
      </div>
    </div>
  );
}
