import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

export default function TicketDetailsModal() {
    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <Button>View Ticket</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ticket Information</DialogTitle>
                        <DialogDescription>
                            detailed information about tickets
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}
