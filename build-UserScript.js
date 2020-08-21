const fs = require('fs');
const CleanCSS = require('clean-css');

const input = {
	desc: 'src/scriptDesc.js',
	script: 'src/script.js',
	styles: 'src/styles.css',
	settings: 'src/settings.partial.html'
};

const outputFile = 'UserScript.js';

const rTags = {
	version: '@@version@@',
	desc: '@@desc@@',
	author: '@@author@@',
	styles: '@@plainStyles@@',
	settings: '@@settings@@'
};

const encoding = 'utf8';

try {
	const pckg = JSON.parse(fs.readFileSync('package.json'));
	
	const desc =	fs.readFileSync(input.desc, encoding);
	const script =	fs.readFileSync(input.script, encoding);
	const styles =	fs.readFileSync(input.styles, encoding);
	const settings = fs.readFileSync(input.settings, encoding).replace(/(\t|\n|\r\n)/gi, '');
	
	const minOptions = {
		advanced: false,
		aggressiveMerging: false
	};
	const minifiedStyles = new CleanCSS(minOptions).minify(styles).styles;
	
	const outputContent =
		desc.replace(rTags.version, pckg.version)
			.replace(rTags.desc, pckg.description)
			.replace(rTags.author, pckg.author) +
		'\n\n' +
		script
			.replace(rTags.styles, minifiedStyles)
			.replace(rTags.settings, settings);
		
	fs.writeFileSync(outputFile, outputContent, encoding);
	
	console.log('Build succeeded!');
}
catch(e) {
	console.log('Something went wrong during build ¯\\_(ツ)_/¯\n' + e);
}