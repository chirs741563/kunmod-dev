"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModsEntityManager = void 0;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const ModManager_1 = require("../ModManager");
const ModUtils_1 = require("./ModUtils");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
//const CreatureModel = ModelManager_1.ModelManager.CreatureModel;

class ModsEntityManager {
  static PlayerEntity=null;
  static AllEntityInfo = [];
  static EntitiesSortedList = [];
  static ModsEntitys = {
    EntityList: null,
    EntityCount: 0,
  };

  EntityInfo = {
    ConfigType: 0,
    CreatureDataId: 0,
    Id: 0,
    Index: 0,
    PbDataId: 0,
    Priority: 0,
    IsInit: false,
    Valid: false,
    Entity: new this.Entity(),
  };

  Entity = {};

  EntityData = {
    AreaId: 0,
    BlueprintType: "",
    Id: 0,
    InSleep: false,
    Transform: new this.Transform(),
  };

  Transform = {
    Pos: new this.Pos(),
    Rot: new this.Rot(),
  };

  Pos = {
    X: 0,
    Y: 0,
    Z: 0,
  };

  Rot = {
    X: 0,
    Y: 0,
    Z: 0,
  };

  static GetPlayerEntity() {
    this.PlayerEntity =Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity;
    return this.PlayerEntity;
  }
  static GetPlayerPos() {
    let pos =Global_1.Global.BaseCharacter?.CharacterActorComponent.CachedDesiredActorLocation.Tuple;
    let playerPos = {    
      X: pos[0]/100,
      Y: pos[1]/100,
      Z: pos[2]/100};
      
    return playerPos;
  }
  static PushEntityList() {
    this.GetEntitySortedList();
    this.ModsEntitys.EntityList = this.EntitiesSortedList;
    this.GetEntityCount();
    this.GetPlayerEntity()
    // puerts_1.logger.warn(
    //   "[KUNMODDEBUG]:GetEntityList",
    //   this.ModsEntitys.EntityList
    // );
    return this.ModsEntitys.EntityList;
  }

  static GetEntitySortedList() {
    this.EntitiesSortedList =
      ModelManager_1.ModelManager.CreatureModel.EntitiesSortedList;
    return this.EntitiesSortedList;
  }

  static GetEntityCount() {
    this.ModsEntitys.EntityCount = this.EntitiesSortedList.length;
    // puerts_1.logger.warn(
    //   "[KUNMODDEBUG]:GetEntityCount",
    //   this.ModsEntitys.EntityCount
    // );
    return this.ModsEntitys.EntityCount;
  }
  static GetEntityId(entity) {
    return entity.Id;
  }
  static GetPosition(entity) {
    let Pbdata = this.GetEntityData(entity.PbDataId);
    puerts_1.logger.warn("entitymanager:getpos:pbdata:",Pbdata);
    let pos = Pbdata.Transform.Pos;
    puerts_1.logger.warn("entitymanager:getpos:pos:",pos);

    return pos;
  }
  static GetEntity(entity) {
    return entity.Entity;
  }
  static GetBlueprintType(entity) {
    try {
      let PbData = this.GetEntityData(entity.PbDataId);
      return PbData.BlueprintType;
    } catch (error) {
      return "unknownBlueprintType";
    }
  }

  static GetEntityData(PbDataId) {
    try {
      return ModelManager_1.ModelManager.CreatureModel.GetEntityData(PbDataId);
    } catch (error) {
      return null;
    }
  }

  static PushEntityInfo(onlydebug) {
    this.AllEntityInfo = [];
    this.GetEntitySortedList();
    for (let i = 0; i < this.EntitiesSortedList.length; i++) {
      let entityInfo = this.EntitiesSortedList[i];
      let entityData = this.GetEntityData(entityInfo.PbDataId);
      this.AllEntityInfo.push({
        ...entityInfo,
        EntityData: entityData,
      });
    }

    puerts_1.logger.warn("[KUNMODDEBUG]:PushEntityInfo", this.AllEntityInfo);
    return this.AllEntityInfo;
  }

  static isCollection(entity) {
    let BlueprintType = this.GetBlueprintType(entity);
    return BlueprintType.startsWith("Collect");
  }
  static isAnimal(entity) {
    let BlueprintType = this.GetBlueprintType(entity);
    return BlueprintType.startsWith("Animal");
  }
  static isTreasure(entity) {
    let BlueprintType = this.GetBlueprintType(entity);
    return BlueprintType.startsWith("Treasure");
  }
  static isMonster(entity) {
    let BlueprintType = this.GetBlueprintType(entity);
    return BlueprintType.startsWith("Monster");
  }
  static isCollection(entity) {
    let BlueprintType = this.GetBlueprintType(entity);
    return BlueprintType.startsWith("Gameplay");
  }
  static isNpc(entity) {
    let BlueprintType = this.GetBlueprintType(entity);
    return (
      BlueprintType.startsWith("Npc") ||
      BlueprintType.startsWith("SimpleNPC") ||
      BlueprintType.startsWith("PasserbyNPC")
    );
  }
  static isQuest(entity) {
    let BlueprintType = this.GetBlueprintType(entity);
    return BlueprintType.startsWith("Quest");
  }
  static isVision(entity) {
    let BlueprintType = this.GetBlueprintType(entity);
    return (
      BlueprintType.startsWith("Vision") ||
      BlueprintType.startsWith("VisionBoss")
    );
  }
  static isWeapon(entity) {
    let BlueprintType = this.GetBlueprintType(entity);
    return BlueprintType.startsWith("Weapon");
  }
  static isPlayer(entity) {
    let BlueprintType = this.GetBlueprintType(entity);
    return BlueprintType.startsWith("Player");
  }
  static isSceneObj(entity) {
    let BlueprintType = this.GetBlueprintType(entity);
    return BlueprintType.startsWith("SceneObj");
  }
}

exports.ModsEntityManager = ModsEntityManager;
