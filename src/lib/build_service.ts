import { Build, Class, Skill, HeadSh0t, OneSh0tOneKill, Vel0city, FastHands, Fearless, Ambush, RisingSh0t, DeathMark, Innervate } from "borderlands2";

interface SkillMapping {
  [key: string]: {
    skillName: string,
    skill: typeof Skill,
    offset: number
  }[]
}

// Maybe skills should be an enum for typing...
const SKILL_MAPPING: SkillMapping = {
  [Class.Assassin]: [{
    skillName: 'Head Sh0t',
    skill: HeadSh0t,
    offset: 0
  },{
    skillName: 'One Sh0t One Kill',
    skill: OneSh0tOneKill,
    offset: 4
  },{
    skillName: 'Vel0city',
    skill: Vel0city,
    offset: 6
  },{
    skillName: 'Fast Hands',
    skill: FastHands,
    offset: 10
  },{
    skillName: 'Fearless',
    skill: Fearless,
    offset: 12
  },{
    skillName: 'Ambush',
    skill: Ambush,
    offset: 13
  },{
    skillName: 'Rising Sh0t',
    skill: RisingSh0t,
    offset: 14
  },{
    skillName: 'Death Mark',
    skill: DeathMark,
    offset: 15
  },{
    skillName: 'Innervate',
    skill: Innervate,
    offset: 17
  }]
}

export class BuildService {
  public static parseUrl(url: string): Build|undefined {
    const regex = /(\w+)(\.html)?#(\d+)$/
    let matches = url.match(regex)

    if(!matches) {
      return
    }

    let [ , buildClass, , build ] = matches

    let classClass = this.getClass(buildClass)
    let skills = this.getSkills(classClass, build)

    return new Build(classClass, skills)
  }

  public static buildUrl(build: Build): string {
    let url = Array.from('0'.repeat(37)) // Mechromancer has 37 skills

    build.skills.forEach(skill => {
      let mappedSkill = SKILL_MAPPING[build.clazz].find(mappedSkill => mappedSkill.skillName === skill.name)

      if(mappedSkill) {
        url[mappedSkill.offset] = skill.level.toString()
      }
    })
    
    return `https://bl2skills.com/${build.clazz.toLowerCase()}.html#${url.join('')}`
  }

  private static getClass(buildClass: string): Class {
    switch(buildClass) {
      case 'assassin':
        return Class.Assassin
      case 'commando':
        return Class.Commando
      case 'gunzerker':
        return Class.Gunzerker
      case 'mechromancer':
        return Class.Mechromancer
      case 'psycho':
        return Class.Pyscho
      case 'siren':
        return Class.Siren
    }
  }

  private static getSkills(buildClass: Class, buildPattern: string): Skill[] {
    let mapping = SKILL_MAPPING[buildClass]
    let skills: Skill[] = []

    // TODO: type this
    mapping.forEach((entry: any) => {
      let level = parseInt(buildPattern[entry.offset])

      if(level > 0) {
        skills.push(new entry.skill(level))
      }
    })

    return skills
  }
}