import { Modal, ModalClose, Sheet } from "@mui/joy";
import Login from "./login";
import { Dispatch, SetStateAction } from "react";

type props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    handleClose: () => void;
};

export default function LoginModal(props: props) {

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={props.open}
            onClose={() => props.setOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    maxWidth: 500,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                }}
            >
                <ModalClose
                    variant="outlined"
                    sx={{
                        top: 'calc(-1/4 * var(--IconButton-size))',
                        right: 'calc(-1/4 * var(--IconButton-size))',
                        boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                        borderRadius: '50%',
                        bgcolor: 'background.body',
                    }}
                />
                <Login handleClose={props.handleClose}/>
            </Sheet>
        </Modal>
    )
}