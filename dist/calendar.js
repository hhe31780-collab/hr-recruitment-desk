// Calendar presentation keeps manual task buckets independent of dates.
export function renderPlanner(state,ui,h){
 const {calDate,calView,assetKind,showCompleted}=ui;
 const {esc,icon,btn,opts,dateString,heading}=h;
 const y=calDate.getFullYear(),m=calDate.getMonth(),selected=dateString(calDate),today=dateString();
 let days=[];
 if(calView==='month'){
  const first=new Date(y,m,1),offset=first.getDay();
  const cells=Math.ceil((offset+new Date(y,m+1,0).getDate())/7)*7;
  for(let i=0;i<cells;i++)days.push(new Date(y,m,1-offset+i));
 }else if(calView==='week'){
  for(let i=0;i<7;i++){const d=new Date(calDate);d.setDate(d.getDate()-calDate.getDay()+i);days.push(d);}
 }else days=[new Date(calDate)];
 const events=state.events.filter(e=>!assetKind||e.type===assetKind);
 const dayEvents=events.filter(e=>e.date===selected).sort((a,b)=>(a.time||'').localeCompare(b.time||''));
 const taskRow=e=>`<article class="planner-task ${e.done?'completed':''}"><input type="checkbox" data-complete="${e.id}" aria-label="完成${esc(e.title)}" ${e.done?'checked':''}><button class="task-content" data-event="${e.id}"><span>${esc(e.title)}</span><small>${e.date?esc(e.date)+(e.time?' · '+esc(e.time):''):'未设截止日期'}${e.type!=='待办'?' · '+esc(e.type):''}</small></button><button class="task-edit" data-event="${e.id}" aria-label="编辑${esc(e.title)}">${icon('settings')}</button></article>`;
 const bucket=(key,title,caption)=>{
  const all=events.filter(e=>e.bucket===key),items=all.filter(e=>showCompleted||!e.done);
  return `<section class="task-column task-column-${key}"><header class="task-column-header"><div class="row"><span class="column-pin">${icon('check')}</span><h2>${title}</h2></div><span class="task-count">${all.filter(e=>!e.done).length}</span></header><p class="column-caption">${caption}</p><div class="task-list">${items.map(taskRow).join('')||`<div class="planner-empty"><span>✦</span><p>暂无${title}</p><small>把想做的事，先记在这里。</small></div>`}</div><form class="quick-task" data-quick-bucket="${key}"><label class="sr-only" for="quick-${key}">添加${title}</label><input id="quick-${key}" name="title" placeholder="添加${title}…" maxlength="200" required autocomplete="off"><button type="submit">添加</button></form></section>`;
 };
 return heading('日历 & 待办','今天的安排，近期的推进，还有更长远的计划。',btn(icon('plus')+'新建日程','new-event',true))+
 `<div class="planner-settings row between"><div class="row wrap"><span class="planner-eyebrow">把时间留给重要的事</span><select id="event-type-filter" aria-label="日程类型">${opts(['面试','Offer','入职','跟进','待办'],assetKind,'全部类型')}</select></div><label class="checkline"><input type="checkbox" id="show-completed" ${showCompleted?'checked':''}>显示已完成</label></div>
 <div class="planner-layout"><section class="planner-calendar"><div class="mini-calendar-header row between"><h2>${y}年${m+1}月</h2><div class="row"><button class="month-nav" data-cal-step="-1" aria-label="上一期">‹</button><button class="month-nav" data-action="today">今</button><button class="month-nav" data-cal-step="1" aria-label="下一期">›</button></div></div><div class="mini-view"><div class="segmented" aria-label="日历视图">${[['day','日'],['week','周'],['month','月']].map(([v,l])=>`<button data-cal-view="${v}" class="${calView===v?'active':''}">${l}</button>`).join('')}</div><small>点击日期查看安排</small></div>
 <div class="mini-calendar-grid ${calView==='day'?'single-day':''}">${calView==='day'?'':['日','一','二','三','四','五','六'].map(d=>`<div class="mini-weekday">${d}</div>`).join('')}${days.map(d=>{const date=dateString(d),has=state.events.some(e=>e.date===date&&!e.done);return `<button class="calendar-day mini-day ${d.getMonth()!==m?'outside':''} ${date===today?'today':''} ${date===selected?'selected':''}" data-select-date="${date}" aria-label="${date}" aria-pressed="${date===selected}"><span>${d.getDate()}</span>${has?'<i aria-hidden="true"></i>':''}</button>`;}).join('')}</div><div class="calendar-legend"><span></span> 有安排</div><div class="today-schedule"><header class="row between"><div><h2>${selected===today?'今日安排':'当日安排'}</h2><small>${m+1}月${calDate.getDate()}日 · ${['星期日','星期一','星期二','星期三','星期四','星期五','星期六'][calDate.getDay()]}</small></div><button class="icon-btn" data-add-date="${selected}" aria-label="添加当日安排">${icon('plus')}</button></header><div class="daily-events">${dayEvents.map(e=>`<article class="daily-event ${e.done?'completed':''}" data-event-type="${esc(e.type)}"><input type="checkbox" data-complete="${e.id}" aria-label="完成${esc(e.title)}" ${e.done?'checked':''}><button data-event="${e.id}"><small>${esc(e.time||'全天')}<span>${esc(e.type)}</span></small><strong>${esc(e.title)}</strong></button></article>`).join('')||'<div class="day-empty">这一天还没有安排，留一点时间给自己。<br><small>点击右上角 + 添加日程</small></div>'}</div></div></section>${bucket('short','短期待办','一步一步，推进眼前的事。')}${bucket('long','长期待办','留给未来，也留在心上。')}</div>`;
}
