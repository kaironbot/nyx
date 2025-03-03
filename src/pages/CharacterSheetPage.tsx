import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Input,
  Textarea,
  Checkbox,
  VStack,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Divider,
  Button,
} from "@chakra-ui/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // 🔹 Per generare un ID univoco se necessario

interface CharacterSkills {
  [key: string]: { proficiency: boolean; expertise: boolean };
}

interface CharacterState {
  id: string;
  name: string;
  class: string;
  level: number;
  background: string;
  race: string;
  age: number;
  features: string;
  equipment: string;
  tools_languages: string;
  backstory: string;
  spells: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  skills: CharacterSkills;
}

const CharacterSheetPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const characterId = searchParams.get("id");
  const isEditableFromURL = searchParams.get("edit") === "true";
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(isEditableFromURL);
  const [character, setCharacter] = useState<CharacterState | null>(null);

  useEffect(() => {
    const storedCharacters = JSON.parse(localStorage.getItem("pendingCharacters") || "[]");

    if (characterId) {
      // 🔹 Se c'è un ID, cerca il personaggio esistente
      const foundCharacter = storedCharacters.find((char: CharacterState) => char.id === characterId);
      if (foundCharacter) {
        setCharacter(foundCharacter);
      }
    } else {
      // 🔹 Se non c'è un ID, crea un nuovo personaggio con dati vuoti
      const newCharacter: CharacterState = {
        id: uuidv4(),
        name: "",
        class: "",
        level: 1,
        background: "",
        race: "",
        age: 0,
        features: "",
        equipment: "",
        tools_languages: "",
        backstory: "",
        spells: "",
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
        skills: {
          "Acrobatics (Dex)": { proficiency: false, expertise: false },
          "Animal Handling (Wis)": { proficiency: false, expertise: false },
          "Arcana (Int)": { proficiency: false, expertise: false },
          "Athletics (Str)": { proficiency: false, expertise: false },
          "Deception (Cha)": { proficiency: false, expertise: false },
          "History (Int)": { proficiency: false, expertise: false },
          "Insight (Wis)": { proficiency: false, expertise: false },
          "Intimidation (Cha)": { proficiency: false, expertise: false },
          "Investigation (Int)": { proficiency: false, expertise: false },
          "Medicine (Wis)": { proficiency: false, expertise: false },
          "Nature (Int)": { proficiency: false, expertise: false },
          "Perception (Wis)": { proficiency: false, expertise: false },
          "Performance (Cha)": { proficiency: false, expertise: false },
          "Persuasion (Cha)": { proficiency: false, expertise: false },
          "Religion (Int)": { proficiency: false, expertise: false },
          "Sleight of Hand (Dex)": { proficiency: false, expertise: false },
          "Stealth (Dex)": { proficiency: false, expertise: false },
          "Survival (Wis)": { proficiency: false, expertise: false },
        },
      };

      setCharacter(newCharacter);
    }
  }, [characterId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (character) {
      setCharacter((prev) => prev ? { 
        ...prev, 
        [name]: typeof prev[name as keyof CharacterState] === "number" ? Number(value) : value 
      } : prev);
    }
  };

  const handleSkillChange = (skillName: string, skillType: "proficiency" | "expertise") => {
    if (character) {
      setCharacter((prev) => prev ? {
        ...prev,
        skills: {
          ...prev.skills,
          [skillName]: {
            ...prev.skills[skillName],
            [skillType]: !prev.skills[skillName][skillType],
          },
        },
      } : prev);
    }
  };

  const handleSave = () => {
    if (!character) return;
    
    const storedCharacters = JSON.parse(localStorage.getItem("pendingCharacters") || "[]");

    // 🔹 Se il personaggio esiste già, aggiorna, altrimenti aggiungi
    const updatedCharacters = storedCharacters.some((char: CharacterState) => char.id === character.id)
      ? storedCharacters.map((char: CharacterState) => (char.id === character.id ? character : char))
      : [...storedCharacters, character];

    localStorage.setItem("pendingCharacters", JSON.stringify(updatedCharacters));

    navigate("/characters");
  };

  if (!character) return <Heading>Caricamento...</Heading>;

  return (
    <Box bg="gray.100" p={6} maxW="1800px" mx="auto" borderRadius="md">
      <Heading size="lg" mb={4} textAlign="center">
        {isEditing ? "Modifica Personaggio" : "Nuovo Personaggio"}
      </Heading>

      <Button colorScheme="blue" onClick={handleSave} mb={4}>
        {isEditing ? "Salva Modifiche" : "Salva"}
      </Button>
      
      <Grid templateColumns="repeat(4, 1fr)" gap={4} mb={4}>
        <GridItem colSpan={4}>
          <FormControl>
            <FormLabel>Nome Personaggio</FormLabel>
            <Input name="name" value={character.name} onChange={handleChange} />
          </FormControl>
        </GridItem>
        <FormControl>
          <FormLabel>Classe e Lv</FormLabel>
          <HStack>
            <Input name="class" value={character.class} onChange={handleChange} />
            <Input name="level" value={character.level} onChange={handleChange} type="number" width="80px" />
          </HStack>
        </FormControl>
        <FormControl>
          <FormLabel>Background</FormLabel>
          <Input name="background" value={character.background} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Razza</FormLabel>
          <Input name="race" value={character.race} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Età</FormLabel>
          <Input name="age" value={character.age} onChange={handleChange} type="number" width="80px" />
        </FormControl>
      </Grid>
      
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        <GridItem>
          <VStack align="start">
            {["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"].map((attr) => (
              <FormControl key={attr}>
                <FormLabel textTransform="capitalize">{attr}</FormLabel>
                <Input name={attr} value={character[attr as keyof CharacterState] as number} onChange={handleChange} type="number" />
              </FormControl>
            ))}
          </VStack>
        </GridItem>
        
        <GridItem>
        <VStack align="start">
            {Object.keys(character.skills).map((skill) => (
              <HStack key={skill} spacing={2} fontSize="sm">
                <Checkbox
                  isChecked={character.skills[skill].proficiency}
                  onChange={() => handleSkillChange(skill, "proficiency")}
                />
                <Checkbox
                  isChecked={character.skills[skill].expertise}
                  onChange={() => handleSkillChange(skill, "expertise")}
                />
                <FormLabel>{skill}</FormLabel>
              </HStack>
            ))}
          </VStack>
        </GridItem>
        
        <GridItem rowSpan={2} colSpan={2}>
          <FormControl>
            <FormLabel>Feature</FormLabel>
            <Textarea name="features" value={character.features} onChange={handleChange} height="180px" />
          </FormControl>
          <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4}>
            <FormControl>
              <FormLabel>Equipaggiamento</FormLabel>
              <Textarea name="equipment" value={character.equipment} onChange={handleChange} height="180px" />
            </FormControl>
            <FormControl>
              <FormLabel>Tool + Lingue</FormLabel>
              <Textarea name="tools_languages" value={character.tools_languages} onChange={handleChange} height="180px" />
            </FormControl>
          </Grid>
        </GridItem>
      </Grid>
      
      <Divider my={6} />
      
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <FormControl>
          <FormLabel>Backstory</FormLabel>
          <Textarea name="backstory" value={character.backstory} onChange={handleChange} height="250px" />
        </FormControl>
        <FormControl>
          <FormLabel>Spells</FormLabel>
          <Textarea name="spells" value={character.spells} onChange={handleChange} height="250px" />
        </FormControl>
      </Grid>
    </Box>
  );
};

export default CharacterSheetPage;
