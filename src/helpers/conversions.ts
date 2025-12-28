/**
 * Helper function to convert to Nile's spreadsheet format.
 */

import { Ability, AbilityType, Attack, Card } from "../db";
import { isAbility } from "./isAbility";


export interface SpreadsheetCard {
    cardname: string;
    level: number;
    hp: number;
    attack: number;
    speed: number;
    charactertype: string;

    /* slot 1*/
    // static ability layer on/off
    slot1static: boolean;
    slot1statictext: string;
    //ability layer on/off
    slot1ability: boolean;
    slot1abilityeffect: string;
    // ability border layers
    slot1glitchin: boolean;
    slot1glitchout: boolean;
    slot1combat: boolean;
    slot1death: boolean;
    slot1support: boolean;

    /* slot 2*/
    // static ability layer on/off
    slot2static: boolean;
    slot2statictext: string;
    //ability layer on/off
    slot2ability: boolean;
    slot2abilityeffect: string;
    // ability border layers
    slot2glitchin: boolean;
    slot2glitchout: boolean;
    slot2combat: boolean;
    slot2death: boolean;
    slot2support: boolean;

    /* slot 3*/
    // static ability layer on/off
    slot3static: boolean;
    slot3statictext: string;
    //ability layer on/off
    slot3ability: boolean;
    slot3abilityeffect: string;
    // ability border layers
    slot3glitchin: boolean;
    slot3glitchout: boolean;
    slot3combat: boolean;
    slot3death: boolean;
    slot3support: boolean;

    /* attack 1 */
    attack1: boolean;
    attack1cost: number;
    attack1name: string;
    attack1hasdmg: boolean;
    attack1dmg: number;
    attack1effect: string;

    /* attack 2 */
    attack2: boolean;
    attack2cost: number;
    attack2name: string;
    attack2hasdmg: boolean;
    attack2dmg: number;
    attack2effect: string;

    /* attack 3 */
    attack3: boolean;
    attack3cost: number;
    attack3name: string;
    attack3hasdmg: boolean;
    attack3dmg: number;
    attack3effect: string;

    /* more base card info */
    art: string;
    hasTrigger: boolean;
    triggerText: string;
    version: string;
}

/**
 * A value shouldn't be undefined in the spreadsheet, so set everything to false/empty string to init a new row.
 */
const newRow = (): SpreadsheetCard => {
    return {
        cardname: "",
        level: 0,
        hp: 0,
        attack: 0,
        speed: 0,
        charactertype: "",

        slot1static: false,
        slot1statictext: "",
        slot1ability: false,
        slot1abilityeffect: "",
        slot1glitchin: false,
        slot1glitchout: false,
        slot1combat: false,
        slot1death: false,
        slot1support: false,

        slot2static: false,
        slot2statictext: "",
        slot2ability: false,
        slot2abilityeffect: "",
        slot2glitchin: false,
        slot2glitchout: false,
        slot2combat: false,
        slot2death: false,
        slot2support: false,

        slot3static: false,
        slot3statictext: "",
        slot3ability: false,
        slot3abilityeffect: "",
        slot3glitchin: false,
        slot3glitchout: false,
        slot3combat: false,
        slot3death: false,
        slot3support: false,

        attack1: false,
        attack1cost: 0,
        attack1name: "",
        attack1hasdmg: false,
        attack1dmg: 0,
        attack1effect: "",

        attack2: false,
        attack2cost: 0,
        attack2name: "",
        attack2hasdmg: false,
        attack2dmg: 0,
        attack2effect: "",

        attack3: false,
        attack3cost: 0,
        attack3name: "",
        attack3hasdmg: false,
        attack3dmg: 0,
        attack3effect: "",
        art: "",
        hasTrigger: false,
        triggerText: "",
        version: ""
    }
}

const convertSlot2NileFmt = (slot: Ability | Attack, index: number) => {
    // find relevant row to set to true and update it
    // add text or cost/amount/text to ability or attack
    return isAbility(slot) ? convertAbility2NileFmt(slot, index) : convertAttack2NileFmt(slot, index)
}

const convertAbility2NileFmt = (ability: Ability, index: number) => {
    const nonStaticAbility = {
        [`slot${index}ability`]: true,
        [`slot${index}abilityeffect`]: ability.effect
    }
    switch (ability.type) {
        case AbilityType.Static:
            return {
                [`slot${index}static`]: true,
                [`slot${index}statictext`]: ability.effect
            }
        case AbilityType.In:
            return {
                ...nonStaticAbility,
                [`slot${index}glitchin`]: true
            }
        case AbilityType.Out:
            return {
                ...nonStaticAbility,
                [`slot${index}glitchout`]: true
            }
        case AbilityType.Combat:
            return {
                ...nonStaticAbility,
                [`slot${index}combat`]: true
            }
        case AbilityType.Death:
            return {
                ...nonStaticAbility,
                [`slot${index}death`]: true
            }
        case AbilityType.Support:
            return {
                ...nonStaticAbility,
                [`slot${index}support`]: true
            }    
    }
}

const convertAttack2NileFmt = (attack: Attack, index: number) => {
 return {
    [`attack${index}`]: true,
    [`attack${index}cost`]: attack.cost,
    [`attack${index}name`]: attack.name, 
    [`attack${index}hasdmg`]: attack.damage > 0 ? true : false,
    [`attack${index}dmg`]: attack.damage.toString,
    [`attack${index}effect`]: attack.effect,
 }
}
export const convert2NileFmt = (card: Card): SpreadsheetCard => {
    // curse your 1-based indexing, Nile
    const slots = Object.assign({}, ...card.slots.map((slot, index) => convertSlot2NileFmt(slot, index+1)))
    return {
        ...newRow(),
        cardname: card.name,
        level: card.level,
        hp: card.hp,
        attack: card.attack,
        speed: card.speed,
        charactertype: card.type,
        art: card.art,
        hasTrigger: card.trigger.length > 0 ? true : false,
        triggerText: card.trigger,
        version: card.version,
        ...slots,
    }
}

const convertSlot2DB = (card: SpreadsheetCard, index: number): Ability | Attack => {
    // todo
    return {
        cost: 0,
        damage: 0,
        effect: '',
        name: ''
    }
}

export const convert2DB = (card: SpreadsheetCard): Omit<Card, "id"> => {
    return {
        name: card.cardname,
        level: card.level,
        hp: card.hp,
        attack: card.attack,
        speed: card.speed,
        type: card.charactertype,
        art: card.art,
        trigger: card.hasTrigger ? card.triggerText : "",
        version: card.version,
        slots: [] // todo slots
    }
}