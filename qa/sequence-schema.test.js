'use strict';
const assert=require('node:assert/strict');
const schema=require('../sequence-schema.js');

const clone=value=>JSON.parse(JSON.stringify(value));
const validLegacyRepair2={checkpointId:schema.IDS.legacyRepair2,answerSetVersion:1,passed:true,scaffolded:true,attempts:3,passedAt:11,lastPassedAt:19,facts:{positiveBaseConversion:true,bcdRepresentation:true,bcdApplication:true,hexadecimalApplication:true}};
const validCompression={playthroughSeen:true,checkpoint:{passed:true,scaffolded:false,attempts:2,passedAt:23,lastPassedAt:29},evidence:{needAndUses:true,losslessVsLossy:true,situationJustification:true,fourFileTypes:true,rle:true}};
const base={version:1,syllabus:'CAIE 9618 2026',chapters:{ch4:validCompression},repairs:{hexAndApplications:true,signedArithmeticAndOverflow:true},repairEvidence:{hexAndApplications:validLegacyRepair2,signedArithmeticAndOverflow:{sentinel:'preserve'}},guide:{sentinel:true},unknown:{nested:{keep:42}}};

assert.equal(schema.legacyRepair2EvidencePassed(base),true,'exact legacy Repair 2 passes');
assert.equal(schema.legacyCompressionEvidencePassed(base),true,'exact legacy Compression passes');
const first=schema.migrateSequenceMap(base,100);
assert.equal(first.ok,true);
assert.equal(first.changed,true);
assert.deepEqual(base.repairEvidence.signedArithmeticAndOverflow,{sentinel:'preserve'},'source map is not mutated');
assert.deepEqual(first.map.unknown,base.unknown,'unknown fields survive');
assert.deepEqual(first.map.guide,base.guide,'guide fields survive');
assert.deepEqual(first.map.chapters,base.chapters,'legacy chapter fields survive');
assert.deepEqual(first.map.repairEvidence.hexAndApplications,base.repairEvidence.hexAndApplications,'legacy Repair 2 evidence survives');
assert.equal(schema.repair2aEvidencePassed(first.map),true);
assert.equal(schema.repair2bEvidencePassed(first.map),true);
assert.equal(schema.nodeEvidencePassed(first.map,'compression'),true);
assert.equal(first.map.repairEvidence.numberSystemsAndBcd.scaffolded,true);
assert.equal(first.map.repairEvidence.numberSystemsAndBcd.passedAt,11);
assert.equal(first.map.repairEvidence.bcdHexApplications.lastPassedAt,19);
assert.equal(first.map.nodeEvidence.compression.passedAt,23);
assert.equal(first.map.migrations.syllabusSequenceV2.appliedAt,100);

const second=schema.migrateSequenceMap(first.map,200);
assert.equal(second.ok,true);
assert.equal(second.changed,false,'second migration is idempotent');
assert.deepEqual(second.map,first.map,'second migration is a deep-equal no-op');

for(const bad of [null,{},[],{version:2},'bad']){
  const result=schema.migrateSequenceMap(bad,100);
  assert.equal(result.ok,false,'unsupported map fails closed');
  assert.equal(result.map,null);
}

const invalidRepairFixtures=[
  {version:1,repairs:{hexAndApplications:true},repairEvidence:{}},
  {version:1,repairs:{hexAndApplications:false},repairEvidence:{hexAndApplications:clone(validLegacyRepair2)}},
  {version:1,repairs:{hexAndApplications:true},repairEvidence:{hexAndApplications:Object.assign(clone(validLegacyRepair2),{checkpointId:'wrong'})}},
  {version:1,repairs:{hexAndApplications:true},repairEvidence:{hexAndApplications:Object.assign(clone(validLegacyRepair2),{answerSetVersion:2})}},
  {version:1,repairs:{hexAndApplications:true},repairEvidence:{hexAndApplications:Object.assign(clone(validLegacyRepair2),{passed:false})}},
  {version:1,repairs:{hexAndApplications:true},repairEvidence:{hexAndApplications:Object.assign(clone(validLegacyRepair2),{facts:Object.assign({},validLegacyRepair2.facts,{bcdApplication:false})})}}
];
for(const fixture of invalidRepairFixtures){
  const result=schema.migrateSequenceMap(fixture,100);
  assert.equal(schema.repair2aEvidencePassed(result.map),false,'invalid legacy Repair 2 does not fan out 2A');
  assert.equal(schema.repair2bEvidencePassed(result.map),false,'invalid legacy Repair 2 does not fan out 2B');
}

const compressionBooleanOnly={version:1,chapters:{ch4:{checkpoint:{passed:true}}}};
assert.equal(schema.nodeEvidencePassed(schema.migrateSequenceMap(compressionBooleanOnly,100).map,'compression'),false,'boolean-only Compression does not migrate');

const existingNew=clone(base);
existingNew.repairs.numberSystemsAndBcd=true;
existingNew.repairEvidence.numberSystemsAndBcd={checkpointId:schema.IDS.repair2a,answerSetVersion:1,passed:true,scaffolded:false,attempts:9,passedAt:7,lastPassedAt:31,facts:{positiveBaseConversion:true,bcdRepresentation:true},newSentinel:'wins'};
const migratedExisting=schema.migrateSequenceMap(existingNew,100).map;
assert.equal(migratedExisting.repairEvidence.numberSystemsAndBcd.newSentinel,'wins','existing semantic evidence wins');
assert.equal(migratedExisting.repairEvidence.numberSystemsAndBcd.attempts,9,'existing attempts do not regress');

const existingPartial=clone(base);
existingPartial.repairs.numberSystemsAndBcd=false;
existingPartial.repairEvidence.numberSystemsAndBcd={checkpointId:'work_in_progress',sentinel:'partial-wins'};
existingPartial.nodes={compression:false};
existingPartial.nodeEvidence={compression:{checkpointId:'work_in_progress',sentinel:'partial-wins'}};
const migratedPartial=schema.migrateSequenceMap(existingPartial,100).map;
assert.equal(migratedPartial.repairs.numberSystemsAndBcd,false,'partial semantic repair flag is not overwritten by legacy fallback');
assert.equal(migratedPartial.repairEvidence.numberSystemsAndBcd.sentinel,'partial-wins','partial semantic repair evidence wins');
assert.equal(migratedPartial.nodes.compression,false,'partial semantic node flag is not overwritten by legacy fallback');
assert.equal(migratedPartial.nodeEvidence.compression.sentinel,'partial-wins','partial semantic node evidence wins');

console.info('[SEQUENCE SCHEMA TEST] all migration and predicate assertions passed');
