import * as React from 'react'
import { Cell, Column, ColumnHeaderCell, Table, Utils } from "@blueprintjs/table";
import { RootState } from '../store'
import { connect, ConnectedProps } from 'react-redux'
import { Weapon, DamageService, TargetType, Build, Class, StatType, ClassMod, WeaponTypeDecorator, Type, GameModeEnum, FastHands, Fearless, RisingSh0t, DeathMark, Ambush, Innervate, HeadSh0t, Vel0city, RisingSh0tEffect, OneSh0tOneKill } from 'borderlands2'
import { MenuItem, Menu } from '@blueprintjs/core';
require("@blueprintjs/table/lib/css/table.css")

let stats = [{
/*
  name: 'Single Shot',
  field: 'singleShot',
  value: (ds: DamageService) => Math.round(ds.getDamage()),
},{
  name: 'DPS',
  field: 'dps',
  value: (ds: DamageService) => Math.round(ds.getDps()),
},{
  name: 'Crit Shot',
  field: 'critShot',
  value: (ds: DamageService) => Math.round(ds.getCritDamage()),
},{
*/
  name: 'Crit DPS',
  field: 'critDps',
  value: (ds: DamageService) => Math.round(ds.getCritDps()),
},{
  name: 'Flesh Shot',
  field: 'fleshShot',
  value: (ds: DamageService) => Math.round(ds.getDamage(TargetType.Flesh)),
},{
  name: 'Flesh DPS',
  field: 'fleshDps',
  value: (ds: DamageService) => Math.round(ds.getTargetTypeDps(TargetType.Flesh)),
},{
  name: 'Flesh Crit Shot',
  field: 'fleshCritShot',
  value: (ds: DamageService) => Math.round(ds.getCritDamage(TargetType.Flesh)),
},{
  name: 'Flesh Crit DPS',
  field: 'fleshCritDps',
  value: (ds: DamageService) => Math.round(ds.getTargetTypeCritDps(TargetType.Flesh)),
},{
  name: 'Armor Shot',
  field: 'armorShot',
  value: (ds: DamageService) => Math.round(ds.getDamage(TargetType.Armor)),
},{
  name: 'Armor DPS',
  field: 'armorDps',
  value: (ds: DamageService) => Math.round(ds.getTargetTypeDps(TargetType.Armor)),
},{
  name: 'Armor Crit Shot',
  field: 'armorCritShot',
  value: (ds: DamageService) => Math.round(ds.getCritDamage(TargetType.Armor)),
},{
  name: 'Armor Crit DPS',
  field: 'armorCritDps',
  value: (ds: DamageService) => Math.round(ds.getTargetTypeCritDps(TargetType.Armor)),
},{
  name: 'Shield Shot',
  field: 'shieldShot',
  value: (ds: DamageService) => Math.round(ds.getDamage(TargetType.Shield)),
},{
  name: 'Shield DPS',
  field: 'shieldDps',
  value: (ds: DamageService) => Math.round(ds.getTargetTypeDps(TargetType.Shield)),
},{
  name: 'Shield Crit Shot',
  field: 'shieldCritShot',
  value: (ds: DamageService) => Math.round(ds.getCritDamage(TargetType.Shield)),
},{
  name: 'Shield Crit DPS',
  field: 'shieldCritDps',
  value: (ds: DamageService) => Math.round(ds.getTargetTypeCritDps(TargetType.Shield)),
}]

const mapState = (state: RootState) => ({
  selectedWeaponIds: state.contextReducer.selectedWeaponIds,
  weapons: state.weaponReducer.weapons
})

const connector = connect(mapState)

type PropsFromRedux = ConnectedProps<typeof connector>

export type ICellLookup = (rowIndex: number, columnIndex: number) => any;
export type ISortCallback = (columnIndex: number, comparator: (a: any, b: any) => number) => void;

export interface ISortableColumn {
  getColumn(getCellData: ICellLookup, sortColumn: ISortCallback): JSX.Element;
}

abstract class AbstractSortableColumn implements ISortableColumn {
  constructor(protected name: string, protected index: number) {}

  public getColumn(getCellData: ICellLookup, sortColumn: ISortCallback) {
    const cellRenderer = (rowIndex: number, columnIndex: number) => (
      <Cell>{getCellData(rowIndex, columnIndex)}</Cell>
    );
    const menuRenderer = this.renderMenu.bind(this, sortColumn);
    const columnHeaderCellRenderer = () => <ColumnHeaderCell name={this.name} menuRenderer={menuRenderer} />;
    return (
      <Column
        cellRenderer={cellRenderer}
        columnHeaderCellRenderer={columnHeaderCellRenderer}
        key={this.index}
        name={this.name}
      />
    );
  }

  protected abstract renderMenu(sortColumn: ISortCallback): JSX.Element;
}

class TextSortableColumn extends AbstractSortableColumn {
  protected renderMenu(sortColumn: ISortCallback) {
    const sortAsc = () => sortColumn(this.index, (a, b) => this.compare(a, b));
    const sortDesc = () => sortColumn(this.index, (a, b) => this.compare(b, a));
    return (
      <Menu>
        <MenuItem icon="sort-asc" onClick={sortAsc} text="Sort Asc" />
        <MenuItem icon="sort-desc" onClick={sortDesc} text="Sort Desc" />
      </Menu>
    );
  }

  private compare(a: any, b: any) {
    return a.toString().localeCompare(b);
  }
}

class NumberSortableColumn extends AbstractSortableColumn {
  protected renderMenu(sortColumn: ISortCallback) {
    const sortAsc = () => sortColumn(this.index, (a, b) => this.compare(a, b));
    const sortDesc = () => sortColumn(this.index, (a, b) => this.compare(b, a));
    return (
      <Menu>
        <MenuItem icon="sort-asc" onClick={sortAsc} text="Sort Asc" />
        <MenuItem icon="sort-desc" onClick={sortDesc} text="Sort Desc" />
      </Menu>
    );
  }

  private compare(a: any, b: any) {
    return a - b
  }
}

interface DamageTableState {
  columns: ISortableColumn[],
  sortedIndexMap: number[],
  data: any[any]
}

class DamageTableComponent extends React.Component<PropsFromRedux, DamageTableState> {
  constructor(props: PropsFromRedux) {
    super(props)

    let idx = 0
    this.state = {
      columns: [
        new TextSortableColumn('Name', idx++),
        new TextSortableColumn('Type', idx++),
        ...stats.map(stat => new NumberSortableColumn(stat.name, idx++))
      ],
      sortedIndexMap: [],
      data: this.compileData(props.selectedWeaponIds, props.weapons)
    }
  }

  componentWillUpdate(props: PropsFromRedux) {
    if(props.selectedWeaponIds !== this.props.selectedWeaponIds || props.weapons !== this.props.weapons) {
      // sortedIndexMap is hack to prevent undefined reference
      this.setState({ data: this.compileData(props.selectedWeaponIds, props.weapons), sortedIndexMap: [] })
    }
  }

  private compileData(selectedWeaponIds: string[], weapons: Weapon[]): any[any] {
    let effect = new RisingSh0tEffect()
    effect.multiplier.setValue(0)

    let classModA = new ClassMod([{
        type: StatType.FireRate,
        value: 0.21,
        decorator: WeaponTypeDecorator(Type.Pistol)
      },{
        type: StatType.MagazineSize,
        value: 0.23,
        decorator: WeaponTypeDecorator(Type.Pistol)
      }],[
        new RisingSh0t(2)
      ])

    let classModB = new ClassMod([{
        type: StatType.GunDamage,
        value: 0.29,
        decorator: WeaponTypeDecorator(Type.SniperRifle)
      },{
        type: StatType.CritHitDamage,
        value: 0.31,
        //decorator: WeaponTypeDecorator(Type.SniperRifle) // bugged
      }],[
        //new OneSh0tOneKill(4),
        //new Precision(3),
        new HeadSh0t(3),
      ])

    let classModC = new ClassMod([{
        type: StatType.GunDamage,
        value: 0.33,
        decorator: WeaponTypeDecorator(Type.SniperRifle)
      },{
        type: StatType.CritHitDamage,
        value: 0.31,
        //decorator: WeaponTypeDecorator(Type.SniperRifle) // bugged
      }],[
        new OneSh0tOneKill(6),
        //new Precision(5),
        //new HeadSh0t(3),
      ])

    let context = {
      build: new Build(
        Class.Assassin,
        [
          new FastHands(5),
          new RisingSh0t(5), 
          new DeathMark(1),
          new Ambush(5),
          new Innervate(5),
          new HeadSh0t(5),
          new Vel0city(3),
          new OneSh0tOneKill(5)
        ],
        classModC
      ),

      badAssRanking: [{
        type: StatType.GunDamage,
        value: 0.102
      },{
        type: StatType.FireRate,
        value: 0.095
      },{
        type: StatType.ReloadSpeed,
        value: 0.102
      },{
        type: StatType.CritHitDamage,
        value: 0.102
      },{
        type: StatType.ElementalEffectChance,
        value: 0.105
      },{
        type: StatType.ElementalEffectDamage,
        value: 0.102
      },{
        type: StatType.GrenadeDamage,
        value: 0.098
      }],

      effects: [
        effect
      ],
      

      gameMode: GameModeEnum.TrueVaultHunterMode
    }


    return selectedWeaponIds.map(weaponId => {
      let weapon = weapons.find(asdf => asdf.id === weaponId)
      let ds = new DamageService(weapon, context)

      return [
        weapon.name,
        weapon.type,
        ...stats.map(stat => {
          return stat.value(ds)
        })
      ]
    })
  }

  private getCellData = (rowIndex: number, columnIndex: number) => {
    const { data } = this.state
    const sortedRowIndex = this.state.sortedIndexMap[rowIndex];
    if (sortedRowIndex != null) {
      rowIndex = sortedRowIndex;
    }
    return data[rowIndex][columnIndex];
  }

  private sortColumn = (columnIndex: number, comparator: (a: any, b: any) => number) => {
    const { data } = this.state;

    const sortedIndexMap = Utils.times(data.length, (i: number) => i);
    sortedIndexMap.sort((a: number, b: number) => {
      return comparator(data[a][columnIndex], data[b][columnIndex]);
    });
    this.setState({ sortedIndexMap });
  }

  render() {
    const { columns, data } = this.state

    const columnsMarkup = columns.map(col => col.getColumn(this.getCellData, this.sortColumn));

    return <>
      <Table numRows={data.length}>
        {columnsMarkup}
      </Table>
    </>
  }
}

export let DamageTable = connector(DamageTableComponent)