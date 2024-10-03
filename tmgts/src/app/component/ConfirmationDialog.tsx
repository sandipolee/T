import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

 const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ open, onClose, onConfirm }) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent>
      <h2 className="text-lg font-semibold">Confirm Deletion</h2>
      <p>Are you sure you want to delete this admin?</p>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

export default ConfirmationDialog ;