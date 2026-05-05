function generateNames() {
  const description = document.getElementById('description').value.trim();
  const style = document.getElementById('style').value;
  
  if (!description) { alert('Please describe your business'); return; }
  
  const prefixes = { modern: ['Nova','Zen','Flow','Core'], classic: ['Royal','Grand','Elite','Prime'], creative: ['Spark','Bloom','Wander','Muse'], tech: ['Data','Cloud','Byte','Sync'] };
  const suffixes = { modern: ['ify','ly','io','hub'], classic: ['& Co','Co','Group','Corp'], creative: ' Studio', tech: ['Tech','Labs','Systems','AI'] };
  
  const words = description.toLowerCase().split(' ');
  const mainWord = words[0];
  const names = [];
  const usedNames = new Set();
  
  for (let i = 0; i < 12 && names.length < 12; i++) {
    let name;
    const type = Math.floor(Math.random() * 4);
    if (type === 0) {
      const prefix = prefixes[style][Math.floor(Math.random() * prefixes[style].length)];
      name = prefix + ' ' + mainWord.charAt(0).toUpperCase() + mainWord.slice(1);
    } else if (type === 1) {
      let suffix = Array.isArray(suffixes[style]) ? suffixes[style][Math.floor(Math.random() * suffixes[style].length)] : suffixes[style];
      name = mainWord.charAt(0).toUpperCase() + mainWord.slice(1) + suffix;
    } else if (type === 2) {
      const extraWords = ['Global','Pro','Smart','Quick'];
      const extra = extraWords[Math.floor(Math.random() * extraWords.length)];
      name = extra + ' ' + mainWord.charAt(0).toUpperCase() + mainWord.slice(1);
    } else {
      const prefix = prefixes[style][Math.floor(Math.random() * prefixes[style].length)];
      let suffix = Array.isArray(suffixes[style]) ? suffixes[style][Math.floor(Math.random() * suffixes[style].length)] : suffixes[style];
      name = prefix + mainWord.charAt(0).toUpperCase() + mainWord.slice(1) + suffix;
    }
    
    name = name.replace(/  +/g, ' ').trim();
    if (!usedNames.has(name.toLowerCase())) {
      usedNames.add(name.toLowerCase());
      names.push(name);
    }
  }
  
  const output = document.getElementById('namesOutput');
  output.innerHTML = '';
  names.forEach((name) => {
    const div = document.createElement('div');
    div.className = 'name-card';
    div.textContent = name;
    div.onclick = function() {
      navigator.clipboard.writeText(name);
      this.classList.add('copied');
      setTimeout(() => this.classList.remove('copied'), 1000);
    };
    output.appendChild(div);
  });
}
