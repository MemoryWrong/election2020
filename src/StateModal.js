import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text
  } from "@chakra-ui/core"

function StateModal({ isOpen, onClose, selectedState }) {
    console.log('ss', selectedState)
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{selectedState.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>{selectedState.electTotal} electotal votes</Text>
                <Text>{selectedState.eevp}% expected vote</Text>
            </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default StateModal;