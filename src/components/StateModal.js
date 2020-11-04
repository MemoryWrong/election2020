import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Heading,
    ModalFooter,
    Button
  } from "@chakra-ui/core"
import { CheckCircleIcon } from '@chakra-ui/icons'

function StateModal({ isOpen, onClose, selectedState }) {
    return (
        <Modal size="xs" isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{selectedState.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>{selectedState.electTotal} electoral votes</Text>
                <Text>{selectedState.eevp}% { selectedState.winner ? `Expected vote` : `of expected vote in` }</Text>
                { selectedState.winner && <Heading as="h4" size="md" textAlign="center" mt={4}><CheckCircleIcon color="green.500" /> {selectedState.winner.fullName}</Heading> }
            </ModalBody>
            <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default StateModal;