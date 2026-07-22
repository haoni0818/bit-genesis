'use strict';
const assert=require('node:assert/strict');
const schema=require('../sequence-schema.js');

let assertions=0;
function check(actual,expected,message){assertions+=1;assert.deepEqual(actual,expected,message)}
const clone=value=>JSON.parse(JSON.stringify(value));
const facts=names=>Object.fromEntries(names.map(name=>[name,true]));
const evidence=(id,version=1)=>({
  checkpointId:schema.IDS[id],
  answerSetVersion:version,
  passed:true,
  scaffolded:false,
  attempts:2,
  passedAt:23,
  lastPassedAt:29,
  facts:facts(schema.NODE_FACTS[id]),
  ...(id==='compression'?{contentId:'compression_v2',validationContract:'compression_checkpoint_p1_p5_v2'}:{}),
  ...(id==='networks'?{contentId:'network_foundations_v1',validationContract:'network_foundations_checkpoint_p1_p5_v1',sectionProgress:'PARTIAL'}:{})
});
const mapWith=(ids,versions={})=>({
  version:1,
  nodes:Object.fromEntries(ids.map(id=>[id,true])),
  nodeEvidence:Object.fromEntries(ids.map(id=>[id,evidence(id,versions[id]||(id==='compression'?2:1))]))
});

check(schema.IDS.compression,'compression_methods_situations_v1','Compression node identity remains stable');
check(schema.NODE_FACTS.compression,[
  'needAndUses','losslessVsLossy','situationJustification','textCompression','bitmapCompression',
  'vectorCompression','soundCompression','rleMechanism','rleSuitability'
],'Compression v2 requires the exact nine syllabus facts');
check(schema.IDS.networks,'network_foundations_models_topologies_v1','Network Foundations node identity is frozen');
check(schema.NODE_FACTS.networks,[
  'networkPurposeBenefits','lanWanCharacteristics','clientServerPeerToPeerRoles',
  'clientServerPeerToPeerEvaluationAndJustification','thinThickClientDifferences',
  'busStarMeshHybridTopologies','topologyPacketTransmission','topologySituationJustification'
],'Network Foundations v1 requires the exact eight N1 facts');

for(const id of ['bitmap','vector','sound','compression','networks']){
  const valid=mapWith([id]);
  check(schema.nodeEvidencePassed(valid,id),true,id+' exact evidence passes');
  check(schema.nodeEvidencePassed({version:1,nodes:{[id]:true},nodeEvidence:{}},id),false,id+' boolean-only fails');
  check(schema.nodeEvidencePassed({version:1,nodes:{[id]:false},nodeEvidence:{[id]:clone(valid.nodeEvidence[id])}},id),false,id+' evidence without node flag fails');
  check(schema.nodeEvidencePassed(Object.assign(clone(valid),{version:2}),id),false,id+' wrong map version fails');
  for(const fact of schema.NODE_FACTS[id]){
    const bad=clone(valid);bad.nodeEvidence[id].facts[fact]=false;
    check(schema.nodeEvidencePassed(bad,id),false,id+' false '+fact+' fails');
  }
}

check(schema.nodeEvidencePassed(mapWith(['sound'],{sound:2}),'sound'),true,'Sound answer set v2 remains accepted');
check(schema.nodeEvidencePassed(mapWith(['bitmap'],{bitmap:2}),'bitmap'),false,'Bitmap answer set v2 is not globally accepted');
const compressionV1=mapWith(['compression'],{compression:1});
check(schema.nodeEvidencePassed(compressionV1,'compression'),false,'Compression answer set v1 is prior evidence, not strict v2');
for(const value of [undefined,'wrong_contract','']){
  const bad=mapWith(['compression']);
  if(value===undefined)delete bad.nodeEvidence.compression.validationContract;else bad.nodeEvidence.compression.validationContract=value;
  check(schema.nodeEvidencePassed(bad,'compression'),false,'Compression validation contract fails closed');
}
for(const value of [undefined,'compression_v1','wrong']){
  const bad=mapWith(['compression']);
  if(value===undefined)delete bad.nodeEvidence.compression.contentId;else bad.nodeEvidence.compression.contentId=value;
  check(schema.nodeEvidencePassed(bad,'compression'),false,'Compression content identity fails closed');
}
for(const field of ['contentId','validationContract','sectionProgress']){
  const expected={contentId:'network_foundations_v1',validationContract:'network_foundations_checkpoint_p1_p5_v1',sectionProgress:'PARTIAL'}[field];
  for(const value of [undefined,'wrong','COMPLETE']){
    if(value===expected)continue;
    const bad=mapWith(['networks']);
    if(value===undefined)delete bad.nodeEvidence.networks[field];else bad.nodeEvidence.networks[field]=value;
    check(schema.nodeEvidencePassed(bad,'networks'),false,'Network Foundations '+field+' fails closed');
  }
}
const networksV2=mapWith(['networks'],{networks:2});
check(schema.nodeEvidencePassed(networksV2,'networks'),false,'Network Foundations answer set v2 is not accepted');
const networksExtraFact=mapWith(['networks']);networksExtraFact.nodeEvidence.networks.facts.unverifiedExtra=true;
check(schema.nodeEvidencePassed(networksExtraFact,'networks'),false,'Network Foundations rejects any ninth fact');
check(schema.nodeEvidencePassed({version:1,nodes:{ACK:true},nodeEvidence:{ACK:{passed:true,facts:{}}}},'ACK'),false,'unknown node fails closed');
check(schema.nodeEvidencePassed({},''),false,'empty node fails closed');

const legacyFacts={needAndUses:true,losslessVsLossy:true,situationJustification:true,fourFileTypes:true,rle:true};
const legacyChapter={version:1,chapters:{ch4:{checkpoint:{passed:true,passedAt:23},evidence:clone(legacyFacts)}}};
const legacyNode={version:1,nodes:{compression:true},nodeEvidence:{compression:{checkpointId:schema.IDS.compression,answerSetVersion:1,passed:true,facts:clone(legacyFacts),sentinel:'keep'}}};
check(schema.compressionPriorEvidencePassed(legacyChapter),true,'old chapters.ch4 five-fact evidence is prior evidence');
check(schema.compressionPriorEvidencePassed(legacyNode),true,'old nodeEvidence v1 five-fact evidence is prior evidence');
check(schema.nodeEvidencePassed(legacyChapter,'compression'),false,'old chapter evidence never satisfies strict predicate');
check(schema.nodeEvidencePassed(legacyNode,'compression'),false,'old node evidence never satisfies strict predicate');
for(const fact of Object.keys(legacyFacts)){
  const bad=clone(legacyChapter);bad.chapters.ch4.evidence[fact]=false;
  check(schema.compressionPriorEvidencePassed(bad),false,'partial old chapter evidence fails '+fact);
  const badNode=clone(legacyNode);badNode.nodeEvidence.compression.facts[fact]=false;
  check(schema.compressionPriorEvidencePassed(badNode),false,'partial old node evidence fails '+fact);
}

const validLegacyRepair2={checkpointId:schema.IDS.legacyRepair2,answerSetVersion:1,passed:true,scaffolded:true,attempts:3,passedAt:11,lastPassedAt:19,facts:{positiveBaseConversion:true,bcdRepresentation:true,bcdApplication:true,hexadecimalApplication:true}};
const base={version:1,syllabus:'CAIE 9618 2026',chapters:clone(legacyChapter.chapters),repairs:{hexAndApplications:true,signedArithmeticAndOverflow:true},repairEvidence:{hexAndApplications:validLegacyRepair2,signedArithmeticAndOverflow:{sentinel:'preserve'}},guide:{sentinel:true},unknown:{nested:{keep:42}}};
const first=schema.migrateSequenceMap(base,100);
check(first.ok,true,'supported map migrates');
check(first.changed,true,'first migration changes map');
check(base.repairEvidence.signedArithmeticAndOverflow,{sentinel:'preserve'},'source map is not mutated');
check(first.map.unknown,base.unknown,'unknown fields survive');
check(first.map.guide,base.guide,'guide fields survive');
check(first.map.chapters,base.chapters,'legacy chapter objects survive exactly');
check(Object.prototype.hasOwnProperty.call(first.map.nodes,'compression'),false,'legacy chapter is not auto-promoted to a node');
check(Object.prototype.hasOwnProperty.call(first.map.nodeEvidence,'compression'),false,'legacy chapter is not auto-promoted to canonical evidence');
check(schema.compressionPriorEvidencePassed(first.map),true,'legacy chapter remains discoverable as prior evidence');
check(schema.nodeEvidencePassed(first.map,'compression'),false,'migration never invents strict Compression v2 evidence');
check(schema.repair2aEvidencePassed(first.map),true,'valid legacy Repair 2 still fans out to 2A');
check(schema.repair2bEvidencePassed(first.map),true,'valid legacy Repair 2 still fans out to 2B');
check(first.map.repairEvidence.numberSystemsAndBcd.passedAt,11,'Repair 2A timestamp preserved');
check(first.map.repairEvidence.bcdHexApplications.lastPassedAt,19,'Repair 2B timestamp preserved');
check(first.map.migrations.syllabusSequenceV2.appliedAt,100,'migration timestamp set once');
const second=schema.migrateSequenceMap(first.map,200);
check(second.ok,true,'second migration supported');
check(second.changed,false,'second migration is idempotent');
check(second.map,first.map,'second migration is a deep-equal no-op');

const migratedOldNode=schema.migrateSequenceMap(legacyNode,100).map;
check(migratedOldNode.nodes.compression,true,'old node flag is preserved');
check(migratedOldNode.nodeEvidence.compression,legacyNode.nodeEvidence.compression,'old node evidence object is preserved exactly');
check(schema.compressionPriorEvidencePassed(migratedOldNode),true,'old node stays prior evidence after migration');
check(schema.nodeEvidencePassed(migratedOldNode,'compression'),false,'old node stays outside strict predicate after migration');

const oldNetworks={version:1,nodes:{networks:true},nodeEvidence:{networks:{checkpointId:'networks_draft_v0',answerSetVersion:1,passed:true,facts:{networking:true},sentinel:'preserve'}}};
check(schema.networkFoundationsPriorEvidenceSeen(oldNetworks),true,'old Networks evidence is visible only as prior/unverified');
check(schema.nodeEvidencePassed(oldNetworks,'networks'),false,'old Networks evidence never satisfies strict Network Foundations v1');
const migratedOldNetworks=schema.migrateSequenceMap(oldNetworks,100).map;
check(migratedOldNetworks.nodes.networks,true,'old Networks node flag is preserved');
check(migratedOldNetworks.nodeEvidence.networks,oldNetworks.nodeEvidence.networks,'old Networks evidence is preserved byte-semantically');
check(schema.networkFoundationsPriorEvidenceSeen(migratedOldNetworks),true,'old Networks remains prior/unverified after migration');
check(schema.nodeEvidencePassed(migratedOldNetworks,'networks'),false,'migration never invents strict Network Foundations facts');
check(Object.prototype.hasOwnProperty.call(migratedOldNetworks.nodeEvidence.networks.facts,'networkPurposeBenefits'),false,'migration does not synthesize new Network Foundations facts');

const oldNamedNetworks={version:1,nodes:{networkFoundations:true},nodeEvidence:{networkFoundations:{checkpointId:'network_foundations_draft_v0',answerSetVersion:1,passed:true,facts:{draft:true}}}};
check(schema.networkFoundationsPriorEvidenceSeen(oldNamedNetworks),true,'old named Network Foundations draft is prior/unverified');
check(schema.nodeEvidencePassed(oldNamedNetworks,'networks'),false,'old named draft cannot unlock N2');

for(const bad of [null,{},[],{version:2},'bad']){
  const result=schema.migrateSequenceMap(bad,100);
  check(result.ok,false,'unsupported map fails closed');
  check(result.map,null,'unsupported map returns no map');
}

const invalidRepairFixtures=[
  {version:1,repairs:{hexAndApplications:true},repairEvidence:{}},
  {version:1,repairs:{hexAndApplications:false},repairEvidence:{hexAndApplications:clone(validLegacyRepair2)}},
  {version:1,repairs:{hexAndApplications:true},repairEvidence:{hexAndApplications:Object.assign(clone(validLegacyRepair2),{checkpointId:'wrong'})}},
  {version:1,repairs:{hexAndApplications:true},repairEvidence:{hexAndApplications:Object.assign(clone(validLegacyRepair2),{answerSetVersion:2})}},
  {version:1,repairs:{hexAndApplications:true},repairEvidence:{hexAndApplications:Object.assign(clone(validLegacyRepair2),{passed:false})}}
];
for(const fixture of invalidRepairFixtures){
  const result=schema.migrateSequenceMap(fixture,100);
  check(schema.repair2aEvidencePassed(result.map),false,'invalid legacy Repair 2 does not fan out 2A');
  check(schema.repair2bEvidencePassed(result.map),false,'invalid legacy Repair 2 does not fan out 2B');
}

const existingPartial=clone(base);
existingPartial.repairs.numberSystemsAndBcd=false;
existingPartial.repairEvidence.numberSystemsAndBcd={checkpointId:'work_in_progress',sentinel:'partial-wins'};
existingPartial.nodes={compression:false};
existingPartial.nodeEvidence={compression:{checkpointId:'work_in_progress',sentinel:'partial-wins'}};
const migratedPartial=schema.migrateSequenceMap(existingPartial,100).map;
check(migratedPartial.repairs.numberSystemsAndBcd,false,'partial semantic repair flag is not overwritten');
check(migratedPartial.repairEvidence.numberSystemsAndBcd.sentinel,'partial-wins','partial semantic repair evidence wins');
check(migratedPartial.nodes.compression,false,'partial Compression flag is preserved');
check(migratedPartial.nodeEvidence.compression.sentinel,'partial-wins','partial Compression evidence is preserved');

for(let bits=0;bits<8;bits+=1){
  const ids=['bitmap','vector','sound'].filter((_,index)=>Boolean(bits&(1<<index)));
  const map=mapWith(ids);
  const allPredecessors=['bitmap','vector','sound'].every(id=>schema.nodeEvidencePassed(map,id));
  check(allPredecessors,bits===7,'predecessor combination '+bits.toString(2).padStart(3,'0')+' is exact');
}
const networkReady=mapWith(['compression']);
check(schema.nodeEvidencePassed(networkReady,'compression'),true,'strict Compression v2 alone is the direct Network Foundations predecessor');
const priorOnly=clone(legacyChapter);
check(schema.nodeEvidencePassed(priorOnly,'compression'),false,'prior Compression does not unlock Network Foundations');
const n2Ready=mapWith(['networks']);
check(schema.nodeEvidencePassed(n2Ready,'networks'),true,'strict Network Foundations v1 unlocks only the next N2 node');
check(n2Ready.nodeEvidence.networks.sectionProgress,'PARTIAL','strict Network Foundations keeps section 2.1 partial');
const n2WrongProgress=clone(n2Ready);n2WrongProgress.nodeEvidence.networks.sectionProgress='COMPLETE';
check(schema.nodeEvidencePassed(n2WrongProgress,'networks'),false,'COMPLETE section marker cannot unlock N2');
const n2MissingFact=clone(n2Ready);delete n2MissingFact.nodeEvidence.networks.facts.topologySituationJustification;
check(schema.nodeEvidencePassed(n2MissingFact,'networks'),false,'missing Network Foundations fact cannot unlock N2');
check(schema.nodeEvidencePassed(oldNetworks,'networks'),false,'prior/unverified Networks cannot unlock N2');

console.info('[SEQUENCE SCHEMA TEST] '+assertions+' assertions passed');
