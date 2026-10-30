import assert from 'node:assert/strict'
export function parseReleaseHistory(markdown){
  const sections=markdown.replaceAll('\r\n','\n').split(/^##\s+/m).slice(1)
  const releases=[]
  for(const section of sections){
    const [heading,...body]=section.split('\n')
    const match=/^(\d+\.\d+\.\d+) · (\d{4}-\d{2}-\d{2}) · 한국시간$/.exec(heading)
    if(!match)continue
    const entries=[...body.join('\n').matchAll(/^-\s+(.+)$/gm)].map(item=>item[1])
    assert.ok(entries.length,'A published release needs its own entries: '+match[1])
    assert.ok(!releases.some(item=>item.version===match[1]),'Duplicate release version: '+match[1])
    releases.push({version:match[1],date:match[2],entries})
  }
  assert.ok(releases.length,'Explicit version/date release headings are required; never infer from package.json')
  return releases
}
