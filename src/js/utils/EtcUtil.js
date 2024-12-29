import { NavLink } from "react-router-dom";

export const spreadMenu = (e) => {
  var temp = [];
  for (var p of e) {
    temp.push({ menuId: p.menuId, menuNm: p.menuNm, menuLevel: p.menuLevel });
    for (var c of p.children) {
      temp.push({ menuId: c.menuId, menuNm: c.menuNm, menuLevel: c.menuLevel });
    }
  }
  return temp;
}
export const setFormData = (fd, obj, strKey) => {
    for (let k in obj) {
        if (strKey.indexOf(k) > -1) {
            fd.append(k, obj[k] || '');
        } else {
            fd.append(k, obj[k]);
        }
    }
}

export const menuLocation = (menus, callback) => {
  if (!Array.isArray(menus)) return false;

  callback(menus);
}

export const getLastPathUrl = (p) => {
    var l = p.lastIndexOf("/");
    return p.substring(l+1);
}

export const getValuesFromRefWithRequired = (ref) => {
    var temp = {};
    for (var key in ref.current) {
        if (ref.current[key].editorInst) { // editor
            temp[key] = ref.current[key].getInstance().getHTML()
        } else if (Array.isArray(ref.current[key])) { // checkbox
            temp[key] = ref.current[key].map(l => l.value);
        } else {
            temp[key] = ref.current[key].value;
        }
    }
    return temp;
}

export const getValuesFromRef = (ref) => {
    var temp = getValuesFromRefWithRequired(ref);
    delete temp.required;
    return temp;
}

let pages = {};
export const getPages = () => {
    if (Object.keys(pages).length > 0) return pages;

    const context = require.context("pages", true, /\.jsx/);
    context.keys().filter((key) => key.startsWith('page')).map((item) => {
        pages[item.substring(item.lastIndexOf('/') + 1, item.indexOf('.jsx'))] = context(item);
    });

    return pages;
}

export const cutByLength = (s, l) => {
    if (s.length <= l) {
        return s;
    } else {
        return s.substring(0,l) + "....";
    }
}

export const loadSearchCondition = (ref, o) => {
    for (var x in ref.current) {
        if (o && o[x]) ref.current[x].value = o[x];
    }
}

export const menu1 = () => {
    return [
        {
        topMenuName: "프로젝트",
        menuPath: "/pjt",
        menuName: "프로젝트",
        menuLevel: 1,
        menuGroup: "pjt",
        menuOrder: 1,
        },
        {
        topMenuName: "프로젝트",
        menuPath: "/pjt/program",
        menuName: "프로그램목록",
        menuLevel: 2,
        menuGroup: "pjt",
        menuOrder: 1,
        },
        {
        topMenuName: "프로젝트",
        menuPath: "/pjt/mbmg",
        menuName: "인력관리",
        menuLevel: 2,
        menuGroup: "pjt",
        menuOrder: 2,
        },
        {
        topMenuName: "프로젝트",
        menuPath: "/pjt/defect",
        menuName: "결함관리",
        menuLevel: 2,
        menuGroup: "pjt",
        menuOrder: 3,
        },
        {
        topMenuName: "프로젝트",
        menuPath: "/pjt/defectAction",
        menuName: "결함조치",
        menuLevel: 2,
        menuGroup: "pjt",
        menuOrder: 4,
        },
        // BRD
        {
        topMenuName: "게시판",
        menuPath: "/brd/ntc",
        menuName: "게시판",
        menuLevel: 1,
        menuGroup: "brd",
        menuOrder: 1,
        },
        {
        topMenuName: "게시판",
        menuPath: "/brd/ntc",
        menuName: "공지사항",
        menuLevel: 2,
        menuGroup: "brd",
        menuOrder: 2,
        },
        // {
        //   topMenuName : "게시판"
        //   , menuPath  : "/brd/ntc/dtl"
        //   , menuName  : "공지사항 상세"
        //   , menuLevel : ""
        //   , menuGroup  : "brd"
        //   , menuOrder : 3
        // },
        // {
        //   topMenuName : "게시판"
        //   , menuPath  : "/brd/ntc/edit"
        //   , menuName  : "공지사항 수정"
        //   , menuLevel : ""
        //   , menuGroup  : "brd"
        //   , menuOrder : 4
        // },
        // {
        //   topMenuName : "게시판"
        //   , menuPath  : "/brd/ntc/crt"
        //   , menuName  : "공지사항 생성"
        //   , menuLevel : ""
        //   , menuGroup  : "brd"
        //   , menuOrder : 5
        // },
        {
        topMenuName : "게시판"
        , menuPath  : "/brd/ntc/dtl"
        , menuName  : "공지사항 상세"
        , menuLevel : ""
        , menuGroup  : "brd"
        , menuOrder : 3
        },
        {
        topMenuName : "게시판"
        , menuPath  : "/brd/ntc/modify"
        , menuName  : "공지사항 수정"
        , menuLevel : ""
        , menuGroup  : "brd"
        , menuOrder : 4
        },
        {
        topMenuName : "게시판"
        , menuPath  : "/brd/ntc/create"
        , menuName  : "공지사항 생성"
        , menuLevel : ""
        , menuGroup  : "brd"
        , menuOrder : 5
        },
        {
        topMenuName : "게시판"
        , menuPath  : "/brd/inq"
        , menuName  : "문의게시판"
        , menuLevel : 2
        , menuGroup  : "brd"
        , menuOrder : 6
        },
    
        // SCH
        { topMenuName : "일정관리", menuPath  : "/sch/schedule", menuName  : "일정관리", menuLevel : 1, menuGroup  : "sch", menuOrder : 1 },
        { topMenuName : "일정관리", menuPath  : "/sch/schedule", menuName  : "나의일정관리", menuLevel : 2, menuGroup  : "sch", menuOrder : 1 },
        { topMenuName : "일정관리", menuPath  : "/sch/schedule/create", menuName  : "나의일정관리", menuLevel : "-", menuGroup  : "sch", menuOrder : 3 },
        { topMenuName : "일정관리", menuPath  : "/sch/schedule/modify", menuName  : "나의일정관리", menuLevel : "-", menuGroup  : "sch", menuOrder : 4 },
        { topMenuName : "일정관리", menuPath  : "/sch/schedule/detail", menuName  : "나의일정관리", menuLevel : "-", menuGroup  : "sch", menuOrder : 5 },
        { topMenuName : "일정관리", menuPath  : "/sch/program", menuName  : "프로그램일정", menuLevel : 2, menuGroup  : "sch", menuOrder :  2},
        { topMenuName : "일정관리", menuPath  : "/sch/project", menuName  : "프로젝트일정", menuLevel : 2, menuGroup  : "sch", menuOrder : 3 },
        { topMenuName : "일정관리", menuPath  : "/sch/project/create", menuName  : "프로젝트일정관리", menuLevel : "-", menuGroup  : "sch", menuOrder : 6 },
        { topMenuName : "일정관리", menuPath  : "/sch/project/modify", menuName  : "프로젝트일정관리", menuLevel : "-", menuGroup  : "sch", menuOrder : 7 },
        { topMenuName : "일정관리", menuPath  : "/sch/project/detail", menuName  : "프로젝트일정관리", menuLevel : "-", menuGroup  : "sch", menuOrder : 8 },
    
        // SYS
        {
        topMenuName: "시스템관리",
        menuPath: "/sys",
        menuName: "시스템관리",
        menuLevel: 1,
        menuGroup: "sys",
        menuOrder: 4,
        },
        {
        topMenuName: "시스템관리",
        menuPath: "/sys/pjtMgt",
        menuName: "프로젝트관리",
        menuLevel: 2,
        menuGroup: "sys",
        menuOrder: 1,
        },
        // {
        //   topMenuName : "시스템관리"
        //   , menuPath  : "/sys/pjtMgt/create"
        //   , menuName  : "프로젝트등록"
        //   , menuLevel : "-"
        //   , menuGroup  : "sys"
        //   , menuOrder : 2
        // },
        // {
        //   topMenuName : "시스템관리"
        //   , menuPath  : "/sys/pjtMgt/detail"
        //   , menuName  : "프로젝트상세"
        //   , menuLevel : "-"
        //   , menuGroup  : "sys"
        //   , menuOrder : 2
        // },
        // {
        //   topMenuName : "시스템관리"
        //   , menuPath  : "/sys/pjtMgt/prgCrt"
        //   , menuName  : "프로그램등록"
        //   , menuLevel : "-"
        //   , menuGroup  : "sys"
        //   , menuOrder : 2
        // },
        {
        topMenuName: "시스템관리"
        , menuPath: "/sys/message"
        , menuName: "메시지관리"
        , menuLevel: 2
        , menuGroup: "sys"
        , menuOrder: 2
        },
        {
        topMenuName: "시스템관리",
        menuPath: "/sys/user",
        menuName: "사용자관리",
        menuLevel: 2,
        menuGroup: "sys",
        menuOrder: 3,
        },
        {
        topMenuName: "시스템관리",
        menuPath: "/sys/code",
        menuName: "코드관리",
        menuLevel: 2,
        menuGroup: "sys",
        menuOrder: 4,
        },
        {
        topMenuName: "시스템관리",
        menuPath: "/sys/view",
        menuName: "화면관리",
        menuLevel: 2,
        menuGroup: "sys",
        menuOrder: 5,
        },
        {
        topMenuName: "시스템관리",
        menuPath: "/sys/menu",
        menuName: "메뉴관리",
        menuLevel: 2,
        menuGroup: "sys",
        menuOrder: 6,
        },
        {
        topMenuName: "시스템관리",
        menuPath: "/sys/auth",
        menuName: "권한관리",
        menuLevel: 2,
        menuGroup: "sys",
        menuOrder: 7,
        },
        {
        topMenuName: "시스템관리",
        menuPath: "/sys/board",
        menuName: "게시판관리",
        menuLevel: 2,
        menuGroup: "sys",
        menuOrder: 8,
        }
    ]
}

export const menu2 = [
    { topMenuName: "Sample", menuPath: "/sam",             menuLevel: 1,   menuGroup: "sam", menuOrder: 9,  menuName: "Sample", },
    { topMenuName: "Sample", menuPath: "/sam/create1",     menuLevel: 2,   menuGroup: "sam", menuOrder: 1,  menuName: "Create1" },
    { topMenuName: "Sample", menuPath: "/sam/modal1",      menuLevel: 2,   menuGroup: "sam", menuOrder: 6,  menuName: "Modal1"  },
    { topMenuName: "Sample", menuPath: "/sam/popup1",      menuLevel: 2,   menuGroup: "sam", menuOrder: 7,  menuName: "Popup1"  },
    { topMenuName: "Sample", menuPath: "/sam/list1",       menuLevel: 2,   menuGroup: "sam", menuOrder: 8,  menuName: "List1"   },
    { topMenuName: "Sample", menuPath: "/sam/button1",     menuLevel: 2,   menuGroup: "sam", menuOrder: 9,  menuName: "Button1" },
    { topMenuName: "Sample", menuPath: "/sam/fileupload1", menuLevel: 2,   menuGroup: "sam", menuOrder: 11, menuName: "File1"   },
    { topMenuName: "Sample", menuPath: "/sam/fileupload2", menuLevel: 2,   menuGroup: "sam", menuOrder: 13, menuName: "File2"   },
    { topMenuName: "Sample", menuPath: "/sam/excel1",      menuLevel: 2,   menuGroup: "sam", menuOrder: 14, menuName: "Excel1"  },
    { topMenuName: "Sample", menuPath: "/sam/searchcnd1",  menuLevel: 2,   menuGroup: "sam", menuOrder: 15, menuName: "Search1" },
    { topMenuName: "Sample", menuPath: "/sam/editor1",     menuLevel: 2,   menuGroup: "sam", menuOrder: 16, menuName: "Editor1" },
    { topMenuName: "Sample", menuPath: "/sam/crud1",       menuLevel: 2,   menuGroup: "sam", menuOrder: 17, menuName: "CRUD1"   },
    { topMenuName: "Sample", menuPath: "/sam/crud1c",      menuLevel: "", menuGroup: "sam", menuOrder: 18, menuName: "CRUD1C"  },
];
