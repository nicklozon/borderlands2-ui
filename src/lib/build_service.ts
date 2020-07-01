import { Build, Class, Skill, HeadSh0t, OneSh0tOneKill, Vel0city, FastHands, Fearless, Ambush, RisingSh0t, DeathMark, Innervate } from "borderlands2";

// TODO: type this
const SKILL_MAPPING: any = {
  [Class.Assassin]: [{
    skill: HeadSh0t,
    offset: 0
  },{
    skill: OneSh0tOneKill,
    offset: 4
  },{
    skill: Vel0city,
    offset: 6
  },{
    skill: FastHands,
    offset: 10
  },{
    skill: Fearless,
    offset: 12
  },{
    skill: Ambush,
    offset: 13
  },{
    skill: RisingSh0t,
    offset: 14
  },{
    skill: DeathMark,
    offset: 15
  },{
    skill: Innervate,
    offset: 17
  }]
}

export class BuildService {
  public static parseUrl(url: string): Build|undefined {
    const regex = /(\w+)\.html#(\d+)$/
    let matches = url.match(regex)

    if(!matches) {
      return
    }

    let [ , buildClass, build ] = matches

    let classClass = this.getClass(buildClass)
    let skills = this.getSkills(classClass, build)

    return new Build(classClass, skills)
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