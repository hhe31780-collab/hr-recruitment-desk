// These operations change only record metadata; retained attachment blobs are never deleted.
export function hideWarehouseJob(state,id,at=new Date().toISOString()){
 const job=state.jobs.find(j=>j.id===id);
 if(!job)throw new Error('岗位不存在，请刷新后重试。');
 job.warehouseHiddenAt=at;
}

export function removeCandidateKeepRelations(state,id){
 const candidate=state.candidates.find(c=>c.id===id);
 if(!candidate)throw new Error('候选人不存在，请刷新后重试。');
 state.candidates=state.candidates.filter(c=>c.id!==id);
 for(const event of state.events)if(event.candidateId===id)event.candidateId='';
 for(const asset of state.assets)if(asset.candidateId===id){
  asset.candidateId=null;
  if(asset.kind==='attachment')asset.kind='document';
 }
}

export function removeCandidatesKeepRelations(state,ids){
 const targets=new Set(ids);
 if(!targets.size)throw new Error('请先选择候选人。');
 const existing=new Set(state.candidates.map(c=>c.id));
 if([...targets].some(id=>!existing.has(id)))throw new Error('所选候选人已变化，请重新选择后再删除。');
 state.candidates=state.candidates.filter(c=>!targets.has(c.id));
 for(const event of state.events)if(targets.has(event.candidateId))event.candidateId='';
 for(const asset of state.assets)if(targets.has(asset.candidateId)){
  asset.candidateId=null;
  if(asset.kind==='attachment')asset.kind='document';
 }
}
