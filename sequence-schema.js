(function(root){
'use strict';

const IDS=Object.freeze({
  ch0:'genesis_ch0_subset_v1',
  prefixes:'prefix_magnitudes_v1',
  legacyRepair2:'positive_bases_bcd_hex_apps_v1',
  repair2a:'number_systems_bcd_representation_v1',
  signed:'signed_binary_arithmetic_overflow_v1',
  repair2b:'bcd_hex_practical_applications_v1',
  characterData:'character_sets_extended_ascii_v1',
  bitmap:'bitmap_encoding_size_quality_v1',
  vector:'vector_encoding_suitability_v1',
  sound:'sound_sampling_representation_v1',
  compression:'compression_methods_situations_v1',
  networks:'network_foundations_models_topologies_v1'
});

const NODE_FACTS=Object.freeze({
  bitmap:Object.freeze(['bitmapEncoding','pixelAndFileHeader','imageAndScreenResolution','colourDepth','bitmapFileSizeCalculation','qualityAndFileSizeEffects']),
  vector:Object.freeze(['vectorEncoding','drawingObjectPropertyList','bitmapVectorSuitability','taskJustification']),
  sound:Object.freeze(['soundEncoding','sampling','samplingRate','samplingResolution','analogueDigital','fileSizeAndAccuracyEffects']),
  compression:Object.freeze(['needAndUses','losslessVsLossy','situationJustification','textCompression','bitmapCompression','vectorCompression','soundCompression','rleMechanism','rleSuitability']),
  networks:Object.freeze(['networkPurposeBenefits','lanWanCharacteristics','clientServerPeerToPeerRoles','clientServerPeerToPeerEvaluationAndJustification','thinThickClientDifferences','busStarMeshHybridTopologies','topologyPacketTransmission','topologySituationJustification'])
});
const LEGACY_COMPRESSION_FACTS=Object.freeze(['needAndUses','losslessVsLossy','situationJustification','fourFileTypes','rle']);
const COMPRESSION_CONTRACT='compression_checkpoint_p1_p5_v2';
const NETWORK_FOUNDATIONS_CONTENT='network_foundations_v1';
const NETWORK_FOUNDATIONS_CONTRACT='network_foundations_checkpoint_p1_p5_v1';

function isObject(value){return Boolean(value)&&typeof value==='object'&&!Array.isArray(value)}
function clone(value){return value===undefined?undefined:JSON.parse(JSON.stringify(value))}
function hasFacts(evidence,names){const facts=evidence&&evidence.facts;return isObject(facts)&&names.every(name=>facts[name]===true)}
function hasExactFacts(evidence,names){const facts=evidence&&evidence.facts;return hasFacts(evidence,names)&&Object.keys(facts).length===names.length&&Object.keys(facts).every(name=>names.includes(name))}
function repairFlag(map,key){return Boolean(map&&map.repairs&&map.repairs[key]===true)}
function repairDetail(map,key){const value=map&&map.repairEvidence&&map.repairEvidence[key];return isObject(value)?value:null}
function acceptedAnswerSetVersion(id,version){return version===1||((id===IDS.sound||id===IDS.compression)&&version===2)}
function exactEvidence(evidence,id,facts){return Boolean(evidence&&evidence.checkpointId===id&&acceptedAnswerSetVersion(id,evidence.answerSetVersion)&&evidence.passed===true&&hasFacts(evidence,facts))}

function chapter0EvidencePassed(map){
  const chapter=map&&map.chapters&&map.chapters.ch0,checkpoint=chapter&&chapter.checkpoint;
  return Boolean(map&&map.version===1&&exactEvidence(checkpoint,IDS.ch0,['smallNonNegativeBinaryPattern','bcdDigitRepresentation','asciiCharacterMapping','unicodeSuitability']));
}
function prefixEvidencePassed(map){return Boolean(map&&map.version===1&&repairFlag(map,'prefixes')&&exactEvidence(repairDetail(map,'prefixes'),IDS.prefixes,['prefixFamilies','magnitudes','comparisonInBytes']))}
function legacyRepair2EvidencePassed(map){return Boolean(map&&map.version===1&&repairFlag(map,'hexAndApplications')&&exactEvidence(repairDetail(map,'hexAndApplications'),IDS.legacyRepair2,['positiveBaseConversion','bcdRepresentation','bcdApplication','hexadecimalApplication']))}
function repair2aEvidencePassed(map){return Boolean(map&&map.version===1&&repairFlag(map,'numberSystemsAndBcd')&&exactEvidence(repairDetail(map,'numberSystemsAndBcd'),IDS.repair2a,['positiveBaseConversion','bcdRepresentation']))}
function signedEvidencePassed(map){return Boolean(map&&map.version===1&&repairFlag(map,'signedArithmeticAndOverflow')&&exactEvidence(repairDetail(map,'signedArithmeticAndOverflow'),IDS.signed,['onesComplementRepresentation','twosComplementRepresentation','binaryAddition','binarySubtraction','overflowRecognition']))}
function repair2bEvidencePassed(map){return Boolean(map&&map.version===1&&repairFlag(map,'bcdHexApplications')&&exactEvidence(repairDetail(map,'bcdHexApplications'),IDS.repair2b,['bcdApplication','hexadecimalApplication']))}
function characterDataEvidencePassed(map){return Boolean(map&&map.version===1&&repairFlag(map,'extendedAscii')&&exactEvidence(repairDetail(map,'extendedAscii'),IDS.characterData,['characterSetDependentBinary','asciiSuitability','extendedAsciiRepresentation','unicodeSuitability']))}
function section11EvidencePassed(map){return chapter0EvidencePassed(map)&&prefixEvidencePassed(map)&&(repair2aEvidencePassed(map)||legacyRepair2EvidencePassed(map))&&signedEvidencePassed(map)&&(repair2bEvidencePassed(map)||legacyRepair2EvidencePassed(map))&&characterDataEvidencePassed(map)}

function nodeEvidencePassed(map,node){
  if(!Object.prototype.hasOwnProperty.call(IDS,node)||!Object.prototype.hasOwnProperty.call(NODE_FACTS,node))return false;
  const evidence=map&&map.nodeEvidence&&map.nodeEvidence[node];
  if(node==='compression'&&(!evidence||evidence.contentId!=='compression_v2'||evidence.answerSetVersion!==2||evidence.validationContract!==COMPRESSION_CONTRACT))return false;
  if(node==='networks'&&(!evidence||evidence.contentId!==NETWORK_FOUNDATIONS_CONTENT||evidence.answerSetVersion!==1||evidence.validationContract!==NETWORK_FOUNDATIONS_CONTRACT||evidence.sectionProgress!=='PARTIAL'||!hasExactFacts(evidence,NODE_FACTS.networks)))return false;
  return Boolean(map&&map.version===1&&map.nodes&&map.nodes[node]===true&&exactEvidence(evidence,IDS[node],NODE_FACTS[node]));
}
function legacyChapterCompressionEvidencePassed(map){
  const chapter=map&&map.chapters&&map.chapters.ch4,checkpoint=chapter&&chapter.checkpoint,evidence=chapter&&chapter.evidence;
  return Boolean(map&&map.version===1&&checkpoint&&checkpoint.passed===true&&isObject(evidence)&&LEGACY_COMPRESSION_FACTS.every(name=>evidence[name]===true));
}
function legacyNodeCompressionEvidencePassed(map){
  const evidence=map&&map.nodeEvidence&&map.nodeEvidence.compression;
  return Boolean(map&&map.version===1&&map.nodes&&map.nodes.compression===true&&evidence&&evidence.checkpointId===IDS.compression&&evidence.answerSetVersion===1&&evidence.passed===true&&hasFacts(evidence,LEGACY_COMPRESSION_FACTS));
}
function compressionPriorEvidencePassed(map){return legacyChapterCompressionEvidencePassed(map)||legacyNodeCompressionEvidencePassed(map)}
function legacyCompressionEvidencePassed(map){return compressionPriorEvidencePassed(map)}
function networkFoundationsPriorEvidenceSeen(map){
  if(!map||map.version!==1||nodeEvidencePassed(map,'networks'))return false;
  const nodes=isObject(map.nodes)?map.nodes:{},evidence=isObject(map.nodeEvidence)?map.nodeEvidence:{},chapters=isObject(map.chapters)?map.chapters:{};
  const oldNode=evidence.networks,oldNamedNode=evidence.networkFoundations,oldChapter=chapters.ch5||chapters.networks;
  return Boolean(nodes.networks===true||nodes.networkFoundations===true||(isObject(oldNode)&&oldNode.passed===true)||(isObject(oldNamedNode)&&oldNamedNode.passed===true)||(isObject(oldChapter)&&(oldChapter.playthroughSeen===true||oldChapter.stage==='end'||isObject(oldChapter.checkpoint)||isObject(oldChapter.evidence))));
}

function migratedRepairEvidence(source,id,facts){
  return {
    checkpointId:id,
    answerSetVersion:1,
    passed:true,
    scaffolded:source.scaffolded===true,
    attempts:Math.max(1,Number(source.attempts)||1),
    passedAt:Number(source.passedAt)||0,
    lastPassedAt:Number(source.lastPassedAt)||Number(source.passedAt)||0,
    migratedFrom:IDS.legacyRepair2,
    sourceEvidencePath:'repairEvidence.hexAndApplications',
    facts
  };
}

function migrateSequenceMap(map,now){
  if(!isObject(map)||map.version!==1)return{ok:false,changed:false,map:null,reason:'UNSUPPORTED_MAP'};
  const next=clone(map),stamp=Number.isFinite(now)?now:Date.now();
  next.repairs=isObject(next.repairs)?next.repairs:{};
  next.repairEvidence=isObject(next.repairEvidence)?next.repairEvidence:{};
  next.nodes=isObject(next.nodes)?next.nodes:{};
  next.nodeEvidence=isObject(next.nodeEvidence)?next.nodeEvidence:{};
  next.migrations=isObject(next.migrations)?next.migrations:{};

  if(legacyRepair2EvidencePassed(map)){
    const source=repairDetail(map,'hexAndApplications');
    const hasRepair2a=Object.prototype.hasOwnProperty.call(next.repairs,'numberSystemsAndBcd')||Object.prototype.hasOwnProperty.call(next.repairEvidence,'numberSystemsAndBcd');
    const hasRepair2b=Object.prototype.hasOwnProperty.call(next.repairs,'bcdHexApplications')||Object.prototype.hasOwnProperty.call(next.repairEvidence,'bcdHexApplications');
    if(!hasRepair2a){
      next.repairs.numberSystemsAndBcd=true;
      next.repairEvidence.numberSystemsAndBcd=migratedRepairEvidence(source,IDS.repair2a,{positiveBaseConversion:true,bcdRepresentation:true});
    }
    if(!hasRepair2b){
      next.repairs.bcdHexApplications=true;
      next.repairEvidence.bcdHexApplications=migratedRepairEvidence(source,IDS.repair2b,{bcdApplication:true,hexadecimalApplication:true});
    }
  }

  const oldMigration=isObject(next.migrations.syllabusSequenceV2)?next.migrations.syllabusSequenceV2:null;
  next.migrations.syllabusSequenceV2=Object.assign({},oldMigration||{},{applied:true,contractVersion:1,appliedAt:oldMigration&&Number.isFinite(oldMigration.appliedAt)?oldMigration.appliedAt:stamp});
  const changed=JSON.stringify(next)!==JSON.stringify(map);
  return{ok:true,changed,map:next,reason:changed?'MIGRATED':'UNCHANGED'};
}

const api={IDS,NODE_FACTS,chapter0EvidencePassed,prefixEvidencePassed,legacyRepair2EvidencePassed,repair2aEvidencePassed,signedEvidencePassed,repair2bEvidencePassed,characterDataEvidencePassed,section11EvidencePassed,nodeEvidencePassed,compressionPriorEvidencePassed,legacyCompressionEvidencePassed,networkFoundationsPriorEvidenceSeen,migrateSequenceMap};
root.GenesisSequence=Object.freeze(api);
if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
