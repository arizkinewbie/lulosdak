import { ButtonSpinner, Modal, ModalBody, ModalContent, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { MdPause } from "react-icons/md";

const ModalErrorAPI = () => {
  const { onClose } = useDisclosure();

  return (
    <Modal isCentered isOpen={true} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.100" backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent>
        <ModalBody bg={"gray.800"} p={10} textAlign={"center"}>
          <Text color={"white"} fontFamily={"Lato"} fontSize={"xl"}>
            <ButtonSpinner color={"gray.200"} />
            Still Closed, Please Wait ....
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalErrorAPI;
