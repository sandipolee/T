import { Button } from "@/components/ui/button";
import { StudentIDCard } from "./StudentIDCard";
import { useRef } from "react";
import jsPDF from "jspdf"
import { toPng } from 'html-to-image';

export type Student = {
  id: string;
  studentId: string;
  name: string;
  class: string;
  dob: string;
  address: string;
  transportLocation: string;
  validity: string;
  photoUrl: string;
};

interface IDCardPreviewProps {
  students: Student[];
  onBack: () => void;
}

export function IDCardPreview({ students, onBack }: IDCardPreviewProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = async () => {
    const element = printRef.current;
    if (!element) return;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const cardsPerPage = 5;
    const margin = 5;
    const cardWidth = (205.74  - 3 * margin) / 2;
    const cardHeight = (129.54   - 3 * margin) / 2;
    console.log(students.length);
    for (let i = 0; i < students.length; i++) {
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

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Button onClick={onBack}>Back</Button>
        <Button onClick={handlePrint}>Print</Button>
      </div>

      <div className="flex justify-center">
      <div ref={printRef} className="printable-area">
        {students.map((student) => (
          <StudentIDCard key={student.id} {...student} />
        ))}
      </div>
      </div>
      
    </div>
  );
}
