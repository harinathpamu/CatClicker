/** Model **/
let model = {
  currentCat: 0,
  cats: [
    {
      name: "Tabby",
      picture:
        "https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426",
      clickCount: 0
    },
    {
      name: "Scaredy",
      picture:
        "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454",
      clickCount: 0
    },
    {
      name: "Shadow",
      picture:
        "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
      clickCount: 0
    },
    {
      name: "Cutie",
      picture:
        "https://lh3.ggpht.com/cesD31eroFxIZ4IEeXPAJkx_8i5-haU3P9LQosGNfV-GfAPUh2bE4iw4zV6Mc9XobWOR70BQh2JAP57wZlM=s0#w=640&h=480",
      clickCount: 0
    }
  ]
};

/** Controller */

let controller = {
  init: function() {
    model.currentCat = 0;
    catListView.init();
    catView.init();
    editButtonView.init();
  },
  getCurrentCat: function() {
    return model.cats[model.currentCat];
  },
  getCats: function() {
    return model.cats;
  },
  setCurrentCat: function(index) {
    model.currentCat = index;
  },
  incrementCounter: function() {
    model.cats[model.currentCat].clickCount++;
    catView.render();
  }
};

/** Views */
let saveButtonView = {
  init() {
    let commonClassName1 = "p-3 shadow border rounded-lg";
    let commonClassName2 = "btn btn-primary shadow";
    let editButtonElem = document.getElementById("edit");
    let editLayoutElem = document.getElementById("edit-layout");
    let saveButtonElem = document.getElementById("save");
    this.catNameElem = document.getElementById("catName");
    this.catImageElem = document.getElementById("catPicture");
    this.countElem = document.getElementById("catCount");

    saveButtonElem.addEventListener("click", () => {
      this.save();
      editLayoutElem.className = commonClassName1 + " d-none";
      editButtonElem.className = commonClassName2 + " d-block";
    });
  },
  save() {
    let currentCat = controller.getCurrentCat();
    let catName = this.catNameElem.value;
    let catImageUrl = this.catImageElem.value;
    let catClickCount = this.countElem.value;

    if (catName !== "") {
      currentCat.name = catName;
    }
    if (catImageUrl !== "") {
      currentCat.picture = catImageUrl;
    }
    if (catClickCount !== "") {
      currentCat.clickCount = catClickCount;
    }

    catView.init();
    catListView.init();
  }
};

let cancelButtonView = {
  init() {
    let commonClassName1 = "p-3 shadow border rounded-lg";
    let commonClassName2 = "btn btn-primary shadow";
    let cancelButtonElem = document.getElementById("cancel");
    let editButtonElem = document.getElementById("edit");
    let editLayoutElem = document.getElementById("edit-layout");
    this.catNameElem = document.getElementById("catName");
    this.catImageElem = document.getElementById("catPicture");
    this.countElem = document.getElementById("catCount");
    cancelButtonElem.addEventListener("click", () => {
      this.cancelEditing();
      editLayoutElem.className = commonClassName1 + " d-none";
      editButtonElem.className = commonClassName2 + " d-block";
    });
  },
  cancelEditing() {
    this.catNameElem.value = "";
    this.catImageElem.value = "";
    this.countElem.value = "";
  }
};

let editButtonView = {
  init() {
    let commonClassName1 = "p-3 shadow border rounded-lg";
    let commonClassName2 = "btn btn-primary shadow";
    let editButtonElem = document.getElementById("edit");
    let editLayoutElem = document.getElementById("edit-layout");
    editButtonElem.addEventListener("click", () => {
      editLayoutElem.className = commonClassName1 + " d-block";
      editButtonElem.className = commonClassName2 + " d-none";
      editCatView.init();
      saveButtonView.init();
      cancelButtonView.init();
    });
  }
};

let editCatView = {
  init() {
    this.catNameElem = document.getElementById("catName");
    this.catImageElem = document.getElementById("catPicture");
    this.countElem = document.getElementById("catCount");
    this.render();
  },
  render() {
    this.catNameElem.value = controller.getCurrentCat().name;
    this.catImageElem.value = controller.getCurrentCat().picture;
    this.countElem.value = controller.getCurrentCat().clickCount;
  }
};

let catListView = {
  init() {
    this.catListElem = document.getElementById("cat-list");
    this.render();
  },
  render() {
    this.catListElem.innerText = "";
    controller.getCats().forEach((cat, index) => {
      let elem = document.createElement("li");
      elem.setAttribute(
        "class",
        "list-group-item  list-group-item-action text-center"
      );
      elem.innerText = cat.name;
      elem.addEventListener("click", function() {
        controller.setCurrentCat(index);
        catView.render();
        editCatView.init();
      });
      this.catListElem.append(elem);
    });
  }
};

let catView = {
  init() {
    this.catElem = document.getElementById("cat");
    this.catNameElem = document.getElementById("cat-name");
    this.catImageElem = document.getElementById("cat-picture");
    this.countElem = document.getElementById("cat-count");

    this.catImageElem.addEventListener("click", function() {
      controller.incrementCounter();
      editCatView.init();
    });

    this.render();
  },
  render() {
    let currentCat = controller.getCurrentCat();
    this.catNameElem.textContent = currentCat.name;
    this.catImageElem.src = currentCat.picture;
    this.countElem.textContent = currentCat.clickCount;
  }
};

// Initiating Controller

controller.init();
