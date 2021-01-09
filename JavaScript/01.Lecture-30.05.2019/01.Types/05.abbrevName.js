function abbrevName(name) {
  if(typeof name !== 'string' && !(name instanceof String)) {
    return 'Invalid parameter. Parameter must be of type string.'
  }

  let nameArgs = name.split(" ");
    
  let abbrevName = nameArgs[0];

  for(let i = 0; i < nameArgs.length; i++) {
    if(i > 0) {
      abbrevName += ' ' + nameArgs[i].charAt(0) + '.';
    }
  }

  return abbrevName;
}
