import React from 'react'
import bug from '../../resources/elements/bug.png';
import dark from '../../resources/elements/dark.png';
import dragon from '../../resources/elements/dragon.png';
import electric from '../../resources/elements/electric.png';
import fairy from '../../resources/elements/fairy.png';
import fighting from '../../resources/elements/fighting.png';
import fire from '../../resources/elements/fire.png';
import flying from '../../resources/elements/flying.png';
import grass from '../../resources/elements/grass.png';
import ground from '../../resources/elements/ground.png';
import ice from '../../resources/elements/ice.png';
import normal from '../../resources/elements/normal.png';
import poison from '../../resources/elements/poison.png';
import psychic from '../../resources/elements/psychic.png';
import rock from '../../resources/elements/rock.png';
import steel from '../../resources/elements/steel.png';
import water from '../../resources/elements/water.png';
import unknown from '../../resources/elements/unknown.png';
import shadow from '../../resources/elements/shadow.png';
import ghost from '../../resources/elements/ghost.png';
import './TypeIcon.css'

export default function TypeIcon({ name, handleFilters }) {
    const types = {
        bug: bug,
        dark: dark,
        dragon: dragon,
        electric: electric,
        fairy: fairy,
        fighting: fighting,
        fire: fire,
        flying: flying,
        grass: grass,
        ground: ground,
        ice: ice,
        normal: normal,
        poison: poison,
        psychic: psychic,
        rock: rock,
        steel: steel,
        water: water,
        unknown: unknown,
        shadow: shadow,
        ghost: ghost
    }
    return (
        <>
            {handleFilters ?
                (<input
                    type='image'
                    src={types[name]}
                    alt={`${name}`}
                    className='type-img'
                    value={name}
                    onClick={handleFilters ? (e) => { handleFilters(e) } : null}
                />) :
                (<img className='type-img' src={types[name]} alt={`${name}`} />)
            }
        </>
    )
}
