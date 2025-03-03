import React, { useState } from 'react';
import styled from 'styled-components';

// Container per le due pagine impilate verticalmente
const SheetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;  /* centra in verticale */
  min-height: 100vh;        /* occupa tutta l'altezza della viewport */
`;

// Wrapper per ciascuna pagina, con posizione relativa per posizionare gli input in modo assoluto
const SheetWrapper = styled.div`
  position: relative;
  width: 797px;
  hight: 1026px;
`;

// Immagine di sfondo che carica l'SVG dalla cartella public
const BackgroundImage = styled.img`
  width: 100%;
  display: block;
`;

// Campo di input posizionato in maniera assoluta
const EditableField = styled.input`
  position: absolute;
  font-size: 1rem;
  border: none;
  background: transparent;
  outline: none;
  color: #000000;
`;

// Textarea per i campi di testo lunghi (es. Feats, Features, Race Traits)
const EditableTextArea = styled.textarea`
  position: absolute;
  font-size: 1rem;
  border: none;
  background: transparent;
  outline: none;
  color: #000000;
  text-align: left;
  padding: 4px;
  line-height: 1.2;
  resize: none;
  overflow-y: auto;
  height: 100%;
  width: 100%;
`;

// Styled component specifico per la checkbox
const EditableCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  width: 10px;
  height: 10px;
  background: transparent;
  border: 1px solid #000000;
  border-radius: 50%;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;

  /* Quando è selezionata, mostra un piccolo cerchio interno */
  &:checked::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: #000000;
    border-radius: 50%;
  }
`;

const NumericTextField = styled.input.attrs({ inputMode: 'numeric' })`
  position: absolute;
  font-size: 1rem;
  border: none;
  background: transparent;
  outline: none;
  color: #000000;
`;

const TwoColumnTextArea = styled.textarea`
  width: 472%;
  height: 262px; /* regola l'altezza in base alle necessità */
  column-count: 2;
  column-gap: 10px; /* spazio tra le colonne */
  resize: none; /* opzionale, per evitare il ridimensionamento */
  font-size: 1rem;
  border: 1px solid #ccc;
  padding: 0.5rem;
`;


export const CharacterSheetPage = () => {
  // Usa un oggetto per tenere tutti i campi del personaggio
  const [character, setCharacter] = useState({
    name: '',
    level: '',
    background: '',
    class: '',
    subclass: '',
    race: '',
    armorclass: '',
    shield: '',
    hitpoints: '',
    proficiencybonus: '',
    initiative: '',
    speed: '',
    size: '',
    passiveperception: '',
    strengthmodifier: '',
    strengthscore: '',
    strengthsavingthrowcheck:'',
    strengthsavingthrow: '',
    athleticscheck: '',
    athletics: '',
    dexteritymodifier: '',
    dexterityscore: '',
    dexteritysavingthrowcheck:'',
    dexteritysavingthrow: '',
    acrobaticscheck: '',
    acrobatics: '',
    sleightofhandcheck: '',
    sleightofhand: '',
    stealthcheck: '',
    stealth: '',
    constitutionmodifier: '',
    constitutionscore: '',
    constitutionsavingthrowcheck:'',
    constitutionsavingthrow: '',
    intelligencemodifier: '',
    intelligencescore: '',
    intelligencesavingthrowcheck:'',
    intelligencesavingthrow: '',
    arcanacheck: '',
    arcana: '',
    historycheck: '',
    history: '',
    investigationcheck: '',
    investigation: '',
    naturecheck: '',
    nature: '',
    religioncheck: '',
    religion: '',
    wisdommodifier: '',
    wisdomscore: '',
    wisdomsavingthrowcheck: '',
    wisdomsavingthrow: '',
    animalhandlingcheck: '',
    animalhandling: '',
    insightcheck: '',
    insight: '',
    medicinecheck: '',
    medicine: '',
    perceptioncheck: '',
    perception: '',
    survivalcheck: '',
    survival: '',
    charismamodifier: '',
    charismascore: '',
    charismasavingthrowcheck: '',
    charismaavingthrow: '',
    deceptioncheck: '',
    deception: '',
    intimidationcheck: '',
    intimidation: '',
    performancecheck: '',
    performance: '',
    persuasioncheck: '',
    persuasion: '',
    weapons: '',
    tools: '',
    armortrainingl: '',
    armortrainingm: '',
    armortrainingh: '',
    features: '',
    features2: '',
    racetraits: '',
    feats: '',
    weapon1: '',
    atkbonusdc1: '',
    damage1: '',
    notes1: '',
    weapon2: '',
    atkbonusdc2: '',
    damage2: '',
    notes2: '',
    weapon3: '',
    atkbonusdc3: '',
    damage3: '',
    notes3: '',
    weapon4: '',
    atkbonusdc4: '',
    damage4: '',
    notes4: '',
    weapon5: '',
    atkbonusdc5: '',
    damage5: '',
    notes5: '',
    weapon6: '',
    atkbonusdc6: '',
    damage6: '',
    notes6: '',
    // Aggiungi altri campi se necessario
  });

  // Funzione per gestire il cambiamento dei campi
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  return (
    <SheetsContainer>
      {/* Prima pagina della scheda */}
      <SheetWrapper>
        <BackgroundImage
          src="assets/DnD_2024_Character-Sheet-1.svg"
          alt="Scheda Personaggio Frontale"
        />
        {/* Campo per il Nome del Personaggio */}
        <EditableField
          name="name" // Questo deve corrispondere alla chiave nell'oggetto character
          value={character.name}
          onChange={handleChange}
          style={{ top: '20px', left: '32px', width: '303px', fontSize: '12px' }}
          placeholder="Nome Personaggio"
        />
        {/* Campo per il Livello */}
        <NumericTextField
          name="level"
          value={character.level}
          onChange={handleChange}
          style={{ top: '34px', left: '339px', width: '54px', fontSize:'24px', textAlign: 'center' }}
          placeholder="Lvl"
          maxLength={2}
        />
        {/* Campo per il background */}
        <EditableField
          name="background"
          value={character.background}
          onChange={handleChange}
          style={{ top: '50px', left: '32px', width: '157px', fontSize:'12px' }}
          placeholder="Background"
        />
        {/* Campo per la classe */}
        <EditableField
          name="class"
          value={character.class}
          onChange={handleChange}
          style={{ top: '52px', left: '194px', width: '131px', fontSize:'12px' }}
          placeholder="Classe"
        />
        {/* Campo per la sottoclasse */}
        <EditableField
            name="subclass"
            value={character.subclass}
            onChange={handleChange}
            style={{ top: '80px', left: '194px', width: '131px', fontSize:'12px' }}
            placeholder="Sotto Classe"
          />
          {/* Campo per la Razza */}
        <EditableField
            name="race"
            value={character.race}
            onChange={handleChange}
            style={{ top: '80px', left: '32px', width: '157px', fontSize:'12px' }}
            placeholder="Razza"
          />
          {/* Campo per la Classe Armatura */}
          <NumericTextField
            name="armorclass"
            value={character.armorclass}
            onChange={handleChange}
            style={{ top: '45px', left: '422px', width: '54px', fontSize:'24px', textAlign: 'center' }}
            placeholder="CA"
            maxLength={2}
          />
          {/* Campo per lo Scudo */}
        <EditableCheckbox
            name="shield"
            value={character.shield}
            onChange={handleChange}
            style={{ top: '94px', left: '443px' }}
          />
          {/* Campo per i Punti Ferita */}
        <NumericTextField
            name="hitpoints"
            value={character.hitpoints}
            onChange={handleChange}
            style={{ top: '45px', left: '503px', width: '54px', fontSize:'24px', textAlign: 'center' }}
            placeholder="HP"
            maxLength={3}
          />
          {/* Campo per la Proficiency Bonus */}
        <NumericTextField
            name="proficiencybonus"
            value={character.proficiencybonus}
            onChange={handleChange}
            style={{ top: '190px', left: '49px', width: '54px', fontSize:'24px', textAlign: 'center' }}
            placeholder="PB"
            maxLength={2}
          />
          {/* Campo per l'iniziativa */}
        <NumericTextField
            name="initiative"
            value={character.initiative}
            onChange={handleChange}
            style={{ top: '165px', left: '320px', width: '54px', fontSize:'24px', textAlign: 'center' }}
            placeholder="IN"
            maxLength={2}
          />
          {/* Campo per la velocità */}
        <NumericTextField
            name="speed"
            value={character.speed}
            onChange={handleChange}
            style={{ top: '165px', left: '445px', width: '54px', fontSize:'24px', textAlign: 'center' }}
            placeholder="VL"
            maxLength={2}
          />
          {/* Campo per la Taglia */}
        <NumericTextField
            name="size"
            value={character.size}
            onChange={handleChange}
            style={{ top: '165px', left: '570px', width: '54px', fontSize:'24px', textAlign: 'center' }}
            placeholder="T"
            maxLength={1}
          />
          {/* Campo per la Percezione Passive */}
        <NumericTextField
            name="passiveperception"
            value={character.passiveperception}
            onChange={handleChange}
            style={{ top: '165px', left: '694px', width: '54px', fontSize:'24px', textAlign: 'center' }}
            placeholder="PP"
            maxLength={2}
          />
          {/* Campo per il modificatore di Forza */}
        <NumericTextField
            name="strengthmodifier"
            value={character.strengthmodifier}
            onChange={handleChange}
            style={{ top: '275px', left: '39px', width: '35px', fontSize:'24px', textAlign: 'center' }}
            placeholder="MF"
            maxLength={3}
          />
          {/* Campo per il valore di Forza */}
        <NumericTextField
            name="strengthscore"
            value={character.strengthscore}
            onChange={handleChange}
            style={{ top: '289px', left: '69px', width: '54px', fontSize:'16px', textAlign: 'center' }}
            placeholder="PF"
            maxLength={2}
          />
          {/* Check per il TS Forza */}
        <EditableCheckbox
            name="strengthsavingthrowcheck"
            value={character.strengthsavingthrowcheck}
            onChange={handleChange}
            style={{ top: '346px', left: '23.5px' }}
          />
          {/* Campo per il TS di Forza */}
        <NumericTextField
            name="strengthsavingthrow"
            value={character.strengthsavingthrow}
            onChange={handleChange}
            style={{ top: '339px', left: '37px', width: '21px', fontSize:'12px', textAlign: 'center' }}
            placeholder="##"
            maxLength={2}
          />
          {/* Campo per il modificatore di Destrezza */}
        <NumericTextField
            name="dexteritymodifier"
            value={character.dexteritymodifier}
            onChange={handleChange}
            style={{ top: '431px', left: '39px', width: '35px', fontSize:'24px', textAlign: 'center' }}
            placeholder="MD"
            maxLength={3}
          />
          {/* Campo per il valore di Destrezza */}
        <NumericTextField
            name="dexterityscore"
            value={character.dexterityscore}
            onChange={handleChange}
            style={{ top: '445px', left: '69px', width: '54px', fontSize:'16px', textAlign: 'center' }}
            placeholder="PD"
            maxLength={2}
          />
          {/* Check per il TS Destrezza */}
        <EditableCheckbox
            name="dexteritysavingthrowcheck"
            value={character.dexteritysavingthrowcheck}
            onChange={handleChange}
            style={{ top: '503px', left: '23.5px' }}
          />
          {/* Campo per il TS di Destrezza */}
        <NumericTextField
            name="dexteritysavingthrow"
            value={character.dexteritysavingthrow}
            onChange={handleChange}
            style={{ top: '500px', left: '37px', width: '21px', fontSize:'12px', textAlign: 'center' }}
            placeholder="##"
            maxLength={2}
          />
          {/* Campo per il modificatore di Costituzione */}
        <NumericTextField
            name="constitutionmodifier"
            value={character.constitutionmodifier}
            onChange={handleChange}
            style={{ top: '626px', left: '39px', width: '35px', fontSize:'24px', textAlign: 'center' }}
            placeholder="MC"
            maxLength={3}
          />
          {/* Campo per il valore di Costituzione */}
        <NumericTextField
            name="constitutionscore"
            value={character.constitutionscore}
            onChange={handleChange}
            style={{ top: '640px', left: '69px', width: '54px', fontSize:'16px', textAlign: 'center' }}
            placeholder="PC"
            maxLength={2}
          />
          {/* Check per il TS Costituzione */}
        <EditableCheckbox
            name="constitutionsavingthrowcheck"
            value={character.constitutionsavingthrowcheck}
            onChange={handleChange}
            style={{ top: '695px', left: '23.5px' }}
          />
          {/* Campo per il TS di Costituzione */}
        <NumericTextField
            name="constitutionsavingthrow"
            value={character.constitutionsavingthrow}
            onChange={handleChange}
            style={{ top: '692px', left: '37px', width: '21px', fontSize:'12px', textAlign: 'center' }}
            placeholder="##"
            maxLength={2}
          />
          {/* Campo per il modificatore di Intelligenza */}
        <NumericTextField
            name="intelligencemodifier"
            value={character.intelligencemodifier}
            onChange={handleChange}
            style={{ top: '173px', left: '180px', width: '35px', fontSize:'24px', textAlign: 'center' }}
            placeholder="MI"
            maxLength={3}
          />
          {/* Campo per il valore di Intelligenza */}
        <NumericTextField
            name="intelligencescore"
            value={character.intelligencescore}
            onChange={handleChange}
            style={{ top: '187px', left: '210px', width: '54px', fontSize:'16px', textAlign: 'center' }}
            placeholder="PI"
            maxLength={2}
          />
          {/* Check per il TS Costituzione */}
        <EditableCheckbox
            name="intelligencesavingthrowcheck"
            value={character.intelligencesavingthrowcheck}
            onChange={handleChange}
            style={{ top: '244px', left: '163px' }}
          />
          {/* Campo per il TS di Costituzione */}
        <NumericTextField
            name="intelligencesavingthrow"
            value={character.intelligencesavingthrow}
            onChange={handleChange}
            style={{ top: '237px', left: '180px', width: '21px', fontSize:'12px', textAlign: 'center' }}
            placeholder="##"
            maxLength={2}
          />
          {/* Campo per il modificatore di Costituzione */}
        <NumericTextField
            name="wisdommodifier"
            value={character.wisdommodifier}
            onChange={handleChange}
            style={{ top: '403px', left: '180px', width: '35px', fontSize:'24px', textAlign: 'center' }}
            placeholder="MS"
            maxLength={3}
          />
          {/* Campo per il valore di Costituzione */}
        <NumericTextField
            name="wisdomscore"
            value={character.wisdomscore}
            onChange={handleChange}
            style={{ top: '417px', left: '210px', width: '54px', fontSize:'16px', textAlign: 'center' }}
            placeholder="PS"
            maxLength={2}
          />
          {/* Check per il TS Sagezza */}
        <EditableCheckbox
            name="wisdomsavingthrowcheck"
            value={character.wisdomsavingthrowcheck}
            onChange={handleChange}
            style={{ top: '475px', left: '163px' }}
          />
          {/* Campo per il TS di Sagezza */}
        <NumericTextField
            name="wisdomsavingthrow"
            value={character.wisdomsavingthrow}
            onChange={handleChange}
            style={{ top: '467px', left: '180px', width: '21px', fontSize:'12px', textAlign: 'center' }}
            placeholder="##"
            maxLength={2}
          />
          {/* Campo per il modificatore di Carisma */}
        <NumericTextField
            name="charismamodifier"
            value={character.charismamodifier}
            onChange={handleChange}
            style={{ top: '634px', left: '180px', width: '35px', fontSize:'24px', textAlign: 'center' }}
            placeholder="MC"
            maxLength={3}
          />
          {/* Campo per il valore di Carisma */}
        <NumericTextField
            name="charismascore"
            value={character.charismascore}
            onChange={handleChange}
            style={{ top: '648px', left: '210px', width: '54px', fontSize:'16px', textAlign: 'center' }}
            placeholder="PC"
            maxLength={2}
          />
          {/* Check per il TS Carisma */}
        <EditableCheckbox
            name="charismasavingthrowcheck"
            value={character.charismasavingthrowcheck}
            onChange={handleChange}
            style={{ top: '706px', left: '163px' }}
          />
          {/* Campo per il TS di Carisma */}
        <NumericTextField
            name="charismancesavingthrow"
            value={character.charismaavingthrow}
            onChange={handleChange}
            style={{ top: '701px', left: '180px', width: '21px', fontSize:'12px', textAlign: 'center' }}
            placeholder="##"
            maxLength={2}
          />
          {/* Check per Persuasione */}
        <EditableCheckbox
          name="persuasioncheck"
          value={character.persuasioncheck}
          onChange={handleChange}
          style={{ top: '787px', left: '163px', width: '10px', height: '10px', borderRadius: '50%' }}
          />

          {/* Campo per Persuasione */}
        <NumericTextField
          name="persuasion"
          value={character.persuasion}
          onChange={handleChange}
          style={{ top: '785px', left: '178px', width: '21px', fontSize: '12px', textAlign: 'center' }}
          placeholder="##"
          maxLength={2}
          />
         {/* Check per Performance */}
        <EditableCheckbox
          name="performancecheck"
          value={character.performancecheck}
          onChange={handleChange}
          style={{ top: '769px', left: '163px', width: '10px', height: '10px', borderRadius: '50%' }}
          />

        {/* Campo per Performance */}
        <NumericTextField
          name="performance"
          value={character.performance}
          onChange={handleChange}
          style={{ top: '766px', left: '178px', width: '21px', fontSize: '12px', textAlign: 'center' }}
          placeholder="##"
          maxLength={2}
        />

          {/* Check per Intimidazione */}
        <EditableCheckbox
          name="intimidationcheck"
          value={character.intimidationcheck}
          onChange={handleChange}
          style={{ top: '750px', left: '163px', width: '10px', height: '10px', borderRadius: '50%' }}
          />

          {/* Campo per Intimidazione */}
        <NumericTextField
          name="intimidation"
          value={character.intimidation}
          onChange={handleChange}
          style={{ top: '745px', left: '179px', width: '21px', fontSize: '12px', textAlign: 'center' }}
          placeholder="##"
          maxLength={2}
          />

          {/* Check per Inganno */}
        <EditableCheckbox
          name="deceptioncheck"
          value={character.deceptioncheck}
          onChange={handleChange}
          style={{ top: '731px', left: '163px', width: '10px', height: '10px', borderRadius: '50%' }}
          />

          {/* Campo per Inganno */}
        <NumericTextField
          name="deception"
          value={character.deception}
          onChange={handleChange}
          style={{ top: '727px', left: '179px', width: '21px', fontSize: '12px', textAlign: 'center' }}
          placeholder="##"
          maxLength={2}
          />

          {/* Check per Sopravvivenza */}
        <EditableCheckbox
          name="survivalcheck"
          value={character.survivalcheck}
          onChange={handleChange}
          style={{ top: '575px', left: '163px', width: '10px', height: '10px', borderRadius: '50%' }}
        />

        {/* Campo per Sopravvivenza */}
        <NumericTextField
          name="survival"
          value={character.survival}
          onChange={handleChange}
          style={{ top: '570px', left: '179px', width: '21px', fontSize: '12px', textAlign: 'center' }}
          placeholder="##"
          maxLength={2}
        />

          {/* Check per Percezione */}
        <EditableCheckbox
          name="perceptioncheck"
          value={character.perceptioncheck}
          onChange={handleChange}
          style={{ top: '557px', left: '163px', width: '10px', height: '10px', borderRadius: '50%' }}
          />

          {/* Campo per Percezione */}
        <NumericTextField
          name="perception"
          value={character.perception}
          onChange={handleChange}
          style={{ top: '553px', left: '179px', width: '21px', fontSize: '12px', textAlign: 'center' }}
          placeholder="##"
          maxLength={2}
          />

          {/* Check per Medicina */}
        <EditableCheckbox
          name="medicinecheck"
          value={character.medicinecheck}
          onChange={handleChange}
          style={{ top: '538px', left: '163px', width: '10px', height: '10px', borderRadius: '50%' }}
          />

          {/* Campo per Medicina */}
        <NumericTextField
          name="medicine"
          value={character.medicine}
          onChange={handleChange}
          style={{ top: '533px', left: '180px', width: '21px', fontSize: '12px', textAlign: 'center' }}
          placeholder="##"
          maxLength={2}
          />

          {/* Check per Furtività */}
        <EditableCheckbox
          name="stealthcheck"
          value={character.stealthcheck}
          onChange={handleChange}
          style={{ top: '566px', left: '22px', width: '10px', height: '10px', borderRadius: '50%' }}
          />

          {/* Campo per Furtività */}
        <NumericTextField
          name="stealth"
          value={character.stealth}
          onChange={handleChange}
          style={{ top: '561px', left: '37px', width: '21px', fontSize: '12px', textAlign: 'center' }}
          placeholder="##"
          maxLength={2}
          />

          {/* Check per Rapidità di Mano */}
        <EditableCheckbox
          name="sleightofhandcheck"
          value={character.sleightofhandcheck}
          onChange={handleChange}
          style={{ top: '547px', left: '22px', width: '10px', height: '10px', borderRadius: '50%' }}
          />

          {/* Campo per Rapidità di Mano */}
        <NumericTextField
          name="sleightofhand"
          value={character.sleightofhand}
          onChange={handleChange}
          style={{ top: '542px', left: '37px', width: '21px', fontSize: '12px', textAlign: 'center' }}
          placeholder="##"
          maxLength={2}
          />

          {/* Check per Atletica */}
        <EditableCheckbox
          name="athleticscheck"
          value={character.athleticscheck}
          onChange={handleChange}
          style={{ top: '373px', left: '22px', width: '10px', height: '10px', borderRadius: '50%' }}
          />

          {/* Campo per Atletica */}
        <NumericTextField
          name="athletics"
          value={character.athletics}
          onChange={handleChange}
          style={{ top: '365px', left: '39px', width: '21px', fontSize: '12px', textAlign: 'center' }}
          placeholder="##"
          maxLength={2}
          />

          {/* Check per Religione */}
        <EditableCheckbox
          name="religioncheck"
          value={character.religioncheck}
          onChange={handleChange}
          style={{ top: '345px', left: '163px', width: '10px', height: '10px', borderRadius: '50%' }}
          />

          {/* Campo per Religione */}
        <NumericTextField
          name="religion"
          value={character.religion}
          onChange={handleChange}
          style={{ top: '338px', left: '179px', width: '21px', fontSize: '12px', textAlign: 'center' }}
          placeholder="##"
          maxLength={2}
          />
          {/* Check per insight */}
        <EditableCheckbox 
          name="insightcheck" 
          value={character.insightcheck} 
          onChange={handleChange} 
          style={{ top: '519px', left: '163px', width: '10px', height: '10px', borderRadius: '50%' }} 
          />
        <NumericTextField 
          name="insight" 
          value={character.insight} 
          onChange={handleChange} 
          style={{ top: '515px', left: '180px', width: '21px', fontSize: '12px', textAlign: 'center' }} 
          placeholder="##" 
          maxLength={2} 
          />
        <EditableCheckbox 
          name="acrobaticscheck" 
          value={character.acrobaticscheck} 
          onChange={handleChange} 
          style={{ top: '529px', left: '22px', width: '10px', height: '10px', borderRadius: '50%' }} 
          />
        <NumericTextField 
          name="acrobatics" 
          value={character.acrobatics} 
          onChange={handleChange} 
          style={{ top: '524px', left: '37px', width: '21px', fontSize: '12px', textAlign: 'center' }} 
          placeholder="##" 
          maxLength={2} 
          />
        <EditableCheckbox 
          name="animalhandlingcheck" 
          value={character.animalhandlingcheck} 
          onChange={handleChange} 
          style={{ top: '501px', left: '163px', width: '10px', height: '10px', borderRadius: '50%' }}
          />
        <EditableCheckbox 
          name="naturecheck" 
          value={character.naturecheck} 
          onChange={handleChange} 
          style={{ top: '326px', left: '163px', width: '10px', height: '10px', borderRadius: '50%' }} 
          />
        <EditableCheckbox 
          name="investigationcheck" 
          value={character.investigationcheck} 
          onChange={handleChange} 
          style={{ top: '308px', left: '163px', width: '10px', height: '10px', borderRadius: '50%' }} 
          />
        <EditableCheckbox 
          name="historycheck" 
          value={character.historycheck} 
          onChange={handleChange} 
          style={{ top: '289px', left: '163px', width: '10px', height: '10px', borderRadius: '50%' }} 
          />
        <EditableCheckbox 
          name="arcanacheck" 
          value={character.arcanacheck} 
          onChange={handleChange} 
          style={{ top: '270px', left: '163px', width: '10px', height: '10px', borderRadius: '50%' }} 
          />
        <NumericTextField 
          name="animalhandling" 
          value={character.animalhandling} 
          onChange={handleChange} 
          style={{ top: '496px', left: '181px', width: '21px', fontSize: '12px', textAlign: 'center' }} 
          placeholder="##" 
          maxLength={2} 
          />
        <NumericTextField 
          name="nature" 
          value={character.nature} 
          onChange={handleChange} 
          style={{ top: '320px', left: '180px', width: '21px', fontSize: '12px', textAlign: 'center' }} 
          placeholder="##" 
          maxLength={2} />
        <NumericTextField 
          name="investigation" 
          value={character.investigation} 
          onChange={handleChange} 
          style={{ top: '302px', left: '181px', width: '21px', fontSize: '12px', textAlign: 'center' }} 
          placeholder="##" 
          maxLength={2} 
          />
        <NumericTextField 
          name="history" 
          value={character.history} 
          onChange={handleChange} 
          style={{ top: '283px', left: '180px', width: '21px', fontSize: '12px', textAlign: 'center' }} 
          placeholder="##" 
          maxLength={2} 
          />
        <NumericTextField 
          name="arcana" 
          value={character.arcana} 
          onChange={handleChange} 
          style={{ top: '264px', left: '181px', width: '21px', fontSize: '12px', textAlign: 'center' }} 
          placeholder="##" 
          maxLength={2} 
          />
          {/* Check per scudo */}
         <EditableCheckbox
          name="shield"
          value={character.shield}
          onChange={handleChange}
          style={{ top: '855px', left: '232px', width: '10px', height: '10px', borderRadius: '50%' }}
          />
          {/* Check per armature leggere */}
        <EditableCheckbox
          name="armortrainingh"
          value={character.armortrainingh}
          onChange={handleChange}
          style={{ top: '855px', left: '182px', width: '10px', height: '10px', borderRadius: '50%' }}
          />
        <EditableCheckbox
          name="armortrainingm"
          value={character.armortrainingm}
          onChange={handleChange}
          style={{ top: '855px', left: '122px', width: '10px', height: '10px', borderRadius: '50%' }}
          />
        <EditableCheckbox
          name="armortrainingl"
          value={character.armortrainingl}
          onChange={handleChange}
          style={{ top: '855px', left: '77px', width: '10px', height: '10px', borderRadius: '50%' }}
          /> 
        <EditableField name="weapon1" value={character.weapon1} onChange={handleChange} style={{ top: '262px', left: '306px', width: '139px', fontSize: '12px' }} placeholder="Weapon 1" />
      <EditableField name="atkbonusdc1" value={character.atkbonusdc1} onChange={handleChange} style={{ top: '262px', left: '447px', width: '58px', fontSize: '12px' }} placeholder="Atk Bonus/DC" />
      <EditableField name="damage1" value={character.damage1} onChange={handleChange} style={{ top: '262px', left: '510px', width: '102px', fontSize: '12px' }} placeholder="Damage" />
      <EditableField name="notes1" value={character.notes1} onChange={handleChange} style={{ top: '262px', left: '614px', width: '102px', fontSize: '12px' }} placeholder="Notes" />

      <EditableField name="weapon2" value={character.weapon2} onChange={handleChange} style={{ top: '289px', left: '306px', width: '139px', fontSize: '12px' }} placeholder="Weapon 2" />
      <EditableField name="atkbonusdc2" value={character.atkbonusdc2} onChange={handleChange} style={{ top: '289px', left: '447px', width: '58px', fontSize: '12px' }} placeholder="Atk Bonus/DC" />
      <EditableField name="damage2" value={character.damage2} onChange={handleChange} style={{ top: '289px', left: '510px', width: '102px', fontSize: '12px' }} placeholder="Damage" />
      <EditableField name="notes2" value={character.notes2} onChange={handleChange} style={{ top: '289px', left: '614px', width: '102px', fontSize: '12px' }} placeholder="Notes" />

      <EditableField name="weapon3" value={character.weapon3} onChange={handleChange} style={{ top: '315px', left: '306px', width: '139px', fontSize: '12px' }} placeholder="Weapon 3" />
      <EditableField name="atkbonusdc3" value={character.atkbonusdc3} onChange={handleChange} style={{ top: '315px', left: '447px', width: '58px', fontSize: '12px' }} placeholder="Atk Bonus/DC" />
      <EditableField name="damage3" value={character.damage3} onChange={handleChange} style={{ top: '315px', left: '510px', width: '102px', fontSize: '12px' }} placeholder="Damage" />
      <EditableField name="notes3" value={character.notes3} onChange={handleChange} style={{ top: '315px', left: '614px', width: '102px', fontSize: '12px' }} placeholder="Notes" />

      <EditableField name="weapon4" value={character.weapon4} onChange={handleChange} style={{ top: '339px', left: '306px', width: '139px', fontSize: '12px' }} placeholder="Weapon 4" />
      <EditableField name="atkbonusdc4" value={character.atkbonusdc4} onChange={handleChange} style={{ top: '339px', left: '447px', width: '58px', fontSize: '12px' }} placeholder="Atk Bonus/DC" />
      <EditableField name="damage4" value={character.damage4} onChange={handleChange} style={{ top: '339px', left: '510px', width: '102px', fontSize: '12px' }} placeholder="Damage" />
      <EditableField name="notes4" value={character.notes4} onChange={handleChange} style={{ top: '339px', left: '614px', width: '102px', fontSize: '12px' }} placeholder="Notes" />

      <EditableField name="weapon5" value={character.weapon5} onChange={handleChange} style={{ top: '365px', left: '306px', width: '139px', fontSize: '12px' }} placeholder="Weapon 5" />
      <EditableField name="atkbonusdc5" value={character.atkbonusdc5} onChange={handleChange} style={{ top: '365px', left: '447px', width: '58px', fontSize: '12px' }} placeholder="Atk Bonus/DC" />
      <EditableField name="damage5" value={character.damage5} onChange={handleChange} style={{ top: '365px', left: '510px', width: '102px', fontSize: '12px' }} placeholder="Damage" />
      <EditableField name="notes5" value={character.notes5} onChange={handleChange} style={{ top: '365px', left: '614px', width: '102px', fontSize: '12px' }} placeholder="Notes" />

      <EditableField name="weapon6" value={character.weapon6} onChange={handleChange} style={{ top: '390px', left: '306px', width: '139px', fontSize: '12px' }} placeholder="Weapon 6" />
      <EditableField name="atkbonusdc6" value={character.atkbonusdc6} onChange={handleChange} style={{ top: '390px', left: '447px', width: '58px', fontSize: '12px' }} placeholder="Atk Bonus/DC" />
      <EditableField name="damage6" value={character.damage6} onChange={handleChange} style={{ top: '390px', left: '510px', width: '102px', fontSize: '12px' }} placeholder="Damage" />
      <EditableField name="notes6" value={character.notes6} onChange={handleChange} style={{ top: '390px', left: '614px', width: '102px', fontSize: '12px' }} placeholder="Notes" />

        {/* Additional Fields */}
      <EditableTextArea
        name="feats"
        value={character.feats}
        onChange={handleChange}
        style={{ top: '785px', left: '554px', width: '224px', height: '228px', fontSize: '12px' }}
        placeholder="Feats"
        />

      <EditableTextArea
        name="racetraits"
        value={character.racetraits}
        onChange={handleChange}
        style={{ top: '783px', left: '299px', width: '224px', height: '228px', fontSize: '12px' }}
        placeholder="Race Traits"
        />

      <EditableTextArea
        name="features"
        value={character.features}
        onChange={handleChange}
        style={{ top: '467px', left: '305px', width: '234px', height: '269px', fontSize: '12px' }}
        placeholder="Features"
        />

      <EditableTextArea
        name="features2"
        value={character.features2}
        onChange={handleChange}
        style={{ top: '467px', left: '540px', width: '234px', height: '269px', fontSize: '12px' }}
        placeholder="Features2"
        />

      <EditableTextArea
        name="tools"
        value={character.tools}
        onChange={handleChange}
        style={{ top: '967px', left: '44px', width: '229px', height: '46px', fontSize: '12px' }}
        placeholder="Tools"
        />

      <EditableTextArea
        name="weapons"
        value={character.weapons}
        onChange={handleChange}
        style={{ top: '884px', left: '21px', width: '252px', height: '67px', fontSize: '12px' }}
        placeholder="Weapons"
        />

        {/* Puoi aggiungere altri campi in modo simile, specificando top, left, width, ecc. */}
      </SheetWrapper>

      {/* Seconda pagina della scheda */}
      <SheetWrapper>
        <BackgroundImage
          src="assets/DnD_2024_Character-Sheet-2.svg"
          alt="Scheda Personaggio Posteriore"
        />
        
        {/* Altri campi per questa pagina */}
      </SheetWrapper>
    </SheetsContainer>
  );
};

export default CharacterSheetPage;
