import React, { useState } from "react";

import axios from "axios";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import {
  Textarea,
  Select,
  Button,
  Box,
  Grid,
  Text,
  Flex,
  useColorMode,
} from "@chakra-ui/react";

const Converter = () => {
  const [inputCode, setInputCode] = useState("");
  const [language, setLanguage] = useState("Python");
  const [convertedCode, setConvertedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const baseURL = process.env.REACT_APP_BACKEND_URL;

  const handleConvert = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${baseURL}/convert`,
        { code: inputCode, language },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response) {
        throw new Error("Code conversion failed");
      }
      const convertedCode = await response.data.convertedCode;
      setLoading(false);
      setConvertedCode(convertedCode);
    } catch (error) {
      console.error("error during code conversion:", error);
    }
  };
  const handleDebug = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${baseURL}/debug`,
        { code: inputCode },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response) {
        throw new Error("code debuging failed");
      }

      const convertedCode = await response.data.convertedCode;
      setLoading(false);
      setConvertedCode(convertedCode);
    } catch (error) {
      console.error("Error during code conversion:", error);
    }
  };
  const handleQuality = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${baseURL}/check`,
        { code: inputCode },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response) {
        throw new Error("code quality checking failed");
      }
      const convertedCode = await response.data.convertedCode;
      setLoading(false);
      setConvertedCode(convertedCode);
    } catch (error) {
      console.error("Error during code conversion:", error);
    }
  };

  return (
    <>
      <Button
        // position="fixed"
        position="absolute"
        top="10px"
        right="10px"
        onClick={toggleColorMode}
        bgColor="inherit"
        _hover={{ bgColor: "inherit" }}
        fontSize="2xl"
      >
        {colorMode === "light" ? <BsMoonFill /> : <BsFillSunFill />}
      </Button>
      <Grid
        height="100vh"
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        templateRows={{ base: "1fr", lg: "auto" }}
      >
        <Box border={"1px sold red"} padding="4" color="brand.900">
          <Text
            fontSize="2xl"
            textTransform="uppercase"
            letterSpacing="wide"
            fontWeight="extrabold"
            mb="2"
          >
            CODEBRIDGE
          </Text>
          <Text></Text>
          <Textarea
            value={inputCode}
            mt="10px"
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Enter code here....."
            height="85vh"
            resize="none"
            fontSize="md"
            backgroundColor="brand.900"
            borderColor="inherit"
          />
        </Box>
        <Box padding="4">
          <Text fontSize="xl" fontWeight="bold" mb="4">
            Select Language
          </Text>
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            marginBottom="4"
          >
            <option value="">Select Language</option>
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
            <option value="C++">C++</option>
            <option value="C#">C#</option>
            <option value="PHP">PHP</option>
            <option value="java">Java</option>
          </Select>
          <Textarea
            value={
              loading
                ? "Please wait while response is loading...."
                : convertedCode
            }
            readOnly
            height="65vh"
            resize="none"
            placeholder="Converted code will appear here..."
            fontSize="md"
          />
          <Flex justifyContent="center" h="80px" alignItems="center">
            <Button
              onClick={handleQuality}
              marginBottom="2"
              bgColor="teal"
              color="white"
              _hover={{ backgroundColor: "brand.900" }}
              _focus={{ backgroundColor: "brand.900" }}
              marginRight="2"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wide"
              paddingX="6"
              isDisabled={inputCode === ""}
            >
              Code Quality
            </Button>
            <Button
              onClick={handleConvert}
              marginBottom="2"
              bgColor="teal"
              color="white"
              _hover={{ backgroundColor: "brand.900" }}
              _focus={{ backgroundColor: "brand.900" }}
              marginRight="2"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wide"
              paddingX="6"
              isDisabled={inputCode === ""}
            >
              Convert
            </Button>
            <Button
              onClick={handleDebug}
              marginBottom="2"
              bgColor="teal"
              color="white"
              _hover={{ backgroundColor: "brand.900" }}
              _focus={{ backgroundColor: "brand.900" }}
              marginRight="2"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wide"
              paddingX="6"
              isDisabled={inputCode === ""}
            >
              Debug
            </Button>
          </Flex>
        </Box>
      </Grid>
    </>
  );
};

export default Converter;
