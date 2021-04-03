function Dialog (name, model = true) {
  let $dlg = $(`
    <div class="notepad-dlg-mask">
      <div class="dialogbox notepad-dlgbox">
        <div class="notepad-dlg-titlebar">
          <p class="title"></p>
          <span class="close-btn" title="关闭">✖</span>
        </div>
        <div class="main notepad-dlg-main">
        </div>
      </div>
    </div>`);

  let $btnClose = $dlg.find('.close-btn'),
      $titleBar = $dlg.find('.notepad-dlg-titlebar'),
      clsName   = 'notepad-dlg-' + name;

  this.destory = () => $dlg.remove();

  this.generate = (content, title) => {
    let $content = $dlg.find('.main'),
        $title   = $dlg.find('.title');

    $content.html(content);
    $title.html(title);
    $dlg.addClass(clsName);

    if(!model) $dlg.removeClass('notepad-dlg-mask');

    return $dlg;
  };

  this.init = () => {
    $dlg.find('.dialogbox').draggable({handle: $titleBar});
    $btnClose.click(this.destory);
  };
}


let $dlgSearch = new Dialog('search', false);

((dlg) => {
  let content = `
    <label>查找内容(N): <input class="txt-content" type="text" autofocus></label><br>
    <label><input type="checkbox" value="capital-sense">区分大小写(C)</label>
    <fieldset class="search-direction">
      <legend>方向</legend>
      <label><input type="radio" name="direction" value="up">向上(U)</label>
      <label><input type="radio" name="direction" value="down" checked>向下(D)</label>
    </fieldset>
    <input class="btn-search btn" type="button" value="查找下一个(F)" disabled>
    <input class="btn-cancel btn" type="button" value="取消">`;

  let $dlg        = dlg.generate(content, '查找');
  let $btnCancel  = $dlg.find('.btn-cancel'),
      $btnSearch  = $dlg.find('.btn-search'),
      $txtContent = $dlg.find('.txt-content');

  let verify = () => {
    if($txtContent.val() !== '') {
      $btnSearch.removeAttr('disabled');
    } else {
      $btnSearch.attr('disabled', 'disabled');
    }
  };

  let initState = () => {
    $dlg.find('input[value="up"]').removeAttr('checked');
    $dlg.find('input[value="down"]')[0].checked = true;
    $dlg.find('input[type="checkbox"]').removeAttr('checked');
    $btnSearch.attr('disabled', 'disabled');
    $txtContent.val('');
    $txtContent.focus();
  };

  dlg.show = (searchHandler) => {
    $('body').append($dlg);
    dlg.init();
    initState();

    $btnCancel.click(dlg.destory);
    $txtContent.keyup(verify);
    $btnSearch.click(() => searchHandler({
      content:      $txtContent.val(),
      capitalSense: $dlg.find('input[type="checkbox"]:checked').val() === 'capital-sense',
      direction:    $dlg.find('input[name="direction"]:checked').val()
    }));

    $txtContent.click((e) => e.stopPropagation());
  };
})($dlgSearch);




// function Dialog(name, model = true) {
//   let $dlg = $(`
//     <div class="notepad-dlg-mask">
//       <div class="dialogbox notepad-dlgbox">
//         <div class="notepad-dlg-titlebar">
//           <p class="title"></p>
//           <span class="close-btn" title="关闭">✖</span>
//         </div>
//         <div class="main notepad-dlg-main">
//         </div>
//       </div>
//     </div>`);

//   let $btnClose = $dlg.find('.close-btn'),
//     $titleBar = $dlg.find('.notepad-dlg-titlebar'),
//     clsName = 'notepad-dlg-' + name;

//   this.destory = () => $dlg.remove();

//   this.generate = (content, title) => {
//     let $content = $dlg.find('.main'),
//       $title = $dlg.find('.title');

//     $content.html(content);
//     $title.html(title);
//     $dlg.addClass(clsName);

//     if (!model) $dlg.removeClass('notepad-dlg-mask');

//     return $dlg;
//   };

//   this.init = () => {
//     $dlg.find('.dialogbox').draggable({ handle: $titleBar });
//     $btnClose.click(this.destory);
//   };
// }

// let $searchDlg = new Dialog('search', false);
// ((dlg) => {
//   let content = `
//       <label for="">查找內容(N)：</label>
//       <input class="txt-line-num" type="text" autofocus>
//       <input type="button" value="查找下一个(F)" disabled></input>
//       <br>
//       <div id="a">
//         <from method="post" id="qufen">
//           <input type="checkbox" name="qufen">区分大小写(C)
//         </from>
//         <fieldset>
//           <legend>方向</legend>
//           <form id="dir">
//             <label><input name="dir" type="radio" value="up">向上(U)</label>
//             <label><input name="dir" type="radio" value="down">向下(D)</label>
//           </form>
//         </fieldset>
//         <input type="button" class="btn-cancel" value="取消">
//       </div>
//   `;
//   let $dlg = dlg.generate(content, '查找');
//   let $btnCancel = $dlg.find('.btn-cancel'),
//     $btnSearch = $dlg.find('.btn-search'),
//     $txtContent = $dlg.find('.txt-content');

//   let verify = () => {
//     if ($txtContent.val() !== '') {
//       $btnSearch.removeAttr('disabled');
//     } else {
//       $btnSearch.attr('disabled', 'disabled');
//     }
//   };

//   let initState = () => {
//     $dlg.find('input[value="up"]').removeAttr('checked');
//     $dlg.find('input[value="down"]')[0].checked = true;
//     $dlg.find('input[type="checkbox"]').removeAttr('checked');
//     $btnSearch.attr('disabled', 'disabled');
//     $txtContent.val('');
//     $txtContent.focus();
//   };

//   dlg.show = (searchHandler) => {
//     $('body').append($dlg);
//     dlg.init();
//     initState();

//     $btnCancel.click(dlg.destory);
//     $txtContent.keyup(verify);
//     $btnSearch.click(() => searchHandler({
//       content: $txtContent.val(),
//       capitalSense: $dlg.find('input[type="checkbox"]:checked').val() === 'capital-sense',
//       direction: $dlg.find('input[name="direction"]:checked').val()
//     }));

//     $txtContent.click((e) => e.stopPropagation());
//   };
// })($searchDlg)











// let $searchDlg = (function () {
// 	let html = `
//   <div class="notepad-dlg-search">
//   <div class="notepad-dlgbox">
//     <div class="titlebar">
//       <p class="title">查找</p>
//       <span class="close-btn">✖</span>
//     </div>
//     <div class="main">
//       <label for="">查找內容(N)：</label>
//       <input class="txt-line-num" type="text" autofocus>
//       <input type="button" value="查找下一个(F)" disabled></input>
//       <br>
//       <div id="a">
//         <from method="post" id="qufen">
//           <input type="checkbox" name="qufen">区分大小写(C)
//         </from>
//         <fieldset>
//           <legend>方向</legend>
//           <form id="dir">
//             <label><input name="dir" type="radio" value="up">向上(U)</label>
//             <label><input name="dir" type="radio" value="down">向下(D)</label>
//           </form>
//         </fieldset>
//         <input type="button" class="btn-cancel" value="取消">
//       </div>
//     </div>
//   </div>`;
// 	let $dlg = $(html);
// 	let	cfg = {
// 			container: 'body',
// 			title: '',
// 			delay: '',
// 			enabled: false,
// 			onClick: null
// 		};
// 	function show(config) {
// 		$.extend(cfg, config);
// 		$('body').append($dlg);
// 	}
// 	function destroy() {
// 		$dlg.remove();
// 	}
//  return {show,destroy}
// })()