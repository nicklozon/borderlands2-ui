import * as React from 'react'
import { Cell, Column, ColumnHeaderCell, Table, Utils } from "@blueprintjs/table";
import { RootState } from '../store'
import { connect, ConnectedProps } from 'react-redux'
import { Weapon, DamageService, TargetType, Build, Class, StatType, ClassMod, WeaponTypeDecorator, Type, GameModeEnum, FastHands, RisingSh0t, DeathMark, Ambush, Innervate, HeadSh0t, Vel0city, RisingSh0tEffect, OneSh0tOneKill, Stat, Context } from 'borderlands2'
import { MenuItem, Menu } from '@blueprintjs/core';
import { ElementalEffectLogos } from '../assets/elemental_effects';
require("@blueprintjs/table/lib/css/table.css")

const mapState = (state: RootState) => ({
  selectedWeaponIds: state.contextReducer.selectedWeaponIds,
  weapons: state.weaponReducer.weapons,
  badassRanking: state.badassRankingReducer.stats,
  // this entire file is going to change, this is a hack for now
  build: state.buildReducer.builds[0] ?? new Build(
    Class.Assassin,
    []
  )
})

interface TableInterface {
  stats: any[]
}

const connector = connect(mapState)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  table: TableInterface
}

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

class DamageTableComponent extends React.Component<Props, DamageTableState> {
  constructor(props: Props) {
    super(props)

    let idx = 0
    this.state = {
      columns: [
        new TextSortableColumn('Name', idx++),
        new TextSortableColumn('Type', idx++),
        ...props.table.stats.map(stat => new NumberSortableColumn(stat.name, idx++))
      ],
      sortedIndexMap: [],
      data: this.compileData(props.selectedWeaponIds, props.weapons, props.badassRanking)
    }
  }

  componentWillUpdate(props: PropsFromRedux) {
    if(props.selectedWeaponIds !== this.props.selectedWeaponIds || props.weapons !== this.props.weapons || props.badassRanking !== this.props.badassRanking || props.build.id !== this.props.build.id) {
      // sortedIndexMap is hack to prevent undefined reference
      this.setState({ data: this.compileData(props.selectedWeaponIds, props.weapons, props.badassRanking), sortedIndexMap: [] })
    }
  }

  private compileData(selectedWeaponIds: string[], weapons: Weapon[], badassRanking: Stat[]): any[any] {
    const { build } = this.props

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

    let context = new Context(
      build,
      'name',
      classModC,
      undefined,
      undefined,
      badassRanking,
      [effect],
      GameModeEnum.TrueVaultHunterMode
    )


    return selectedWeaponIds.map(weaponId => {
      let weapon = weapons.find(asdf => asdf.id === weaponId)
      let ds = new DamageService(weapon, context)

      let nameMarkup = <>{weapon.name} <img src={ElementalEffectLogos[weapon.elementalEffect]} style={{height: '1em'}} /></>
      return [
        nameMarkup,
        weapon.type,
        ...this.props.table.stats.map(stat => {
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