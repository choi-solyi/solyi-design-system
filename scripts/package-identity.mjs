import {readFileSync} from 'node:fs';
export const packageRoles=['core','vue-ui'];
export const currentPackageNames={core:'@solyi/core','vue-ui':'solyi-ui'};
export const historicalUiName='@solyi/vue-ui';
export function packageMetadata(role){return JSON.parse(readFileSync(new URL('../packages/'+role+'/package.json',import.meta.url),'utf8'));}
export function packageTarball(metadata){return metadata.name.replace(/^@/,'').replaceAll('/','-')+'-'+metadata.version+'.tgz';}
export function releasePackage(release,role){
 const names=role==='core'?['@solyi/core']:[historicalUiName,'solyi-ui'];
 const matches=release.packages.filter(pkg=>names.includes(pkg.name));
 if(matches.length!==1)throw Error('Release must contain one '+role+' package');
 return matches[0];
}

// Candidate outputs use a fresh directory; existing tarballs remain immutable.
export function artifactDirectory(){
 const value=JSON.parse(readFileSync(new URL('../package.json',import.meta.url),'utf8')).solyiArtifacts||'artifacts';
 if(!new RegExp('^artifacts(?:/[a-zA-Z0-9._-]+)*$').test(value)||value.split('/').some(part=>part==='.'||part==='..'))throw Error('Artifacts must stay inside the workspace artifacts directory');
 return value+'/';
}
