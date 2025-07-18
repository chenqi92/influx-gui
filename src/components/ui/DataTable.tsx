import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';
import { Spin } from './Spin';
import { Empty } from './Empty';

// 兼容 Ant Design Table API 的数据表格组件
interface Column {
  title: string;
  dataIndex: string;
  key: string;
  ellipsis?: boolean;
  width?: number | string;
  render?: (value: any, record: any, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps {
  columns?: Column[];
  dataSource?: any[];
  loading?: boolean;
  rowKey?: string | ((record: any) => string);
  rowClassName?: string | ((record: any, index: number) => string);
  size?: 'small' | 'middle' | 'large';
  scroll?: { x?: number | string; y?: number | string };
  bordered?: boolean;
  className?: string;
  style?: React.CSSProperties;
  pagination?: any; // 暂时保留但不实现
  onRow?: (record: any, index?: number) => { [key: string]: (event: any) => void };
}

const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>(
  (
    {
      columns = [],
      dataSource = [],
      loading = false,
      rowKey = 'key',
      rowClassName,
      size = 'middle',
      scroll,
      bordered = false,
      className,
      style,
      onRow,
      ...props
    },
    ref
  ) => {
    if (loading) {
      return (
        <div
          ref={ref}
          className={cn('flex items-center justify-center p-8', className)}
          style={style}
        >
          <Spin />
        </div>
      );
    }

    if (!dataSource || dataSource.length === 0) {
      return (
        <div
          ref={ref}
          className={cn('flex items-center justify-center p-8', className)}
          style={style}
        >
          <Empty description='暂无数据' />
        </div>
      );
    }

    const getRowKey = (record: any, index: number): string => {
      if (typeof rowKey === 'function') {
        return rowKey(record);
      }
      return record[rowKey] || index.toString();
    };

    const getRowClassName = (record: any, index: number): string => {
      if (typeof rowClassName === 'function') {
        return rowClassName(record, index);
      }
      return rowClassName || '';
    };

    return (
      <div
        ref={ref}
        className={cn('relative w-full h-full', className)}
        style={style}
        {...props}
      >
        <div
          className={cn(
            'w-full h-full',
            scroll?.x && 'overflow-x-auto',
            scroll?.y && 'overflow-y-auto'
          )}
          style={{
            maxHeight: scroll?.y,
            maxWidth: scroll?.x,
          }}
        >
          <Table
            className={cn(
              'w-full table-fixed border-collapse', // 改为table-fixed以更好地控制列宽
              size === 'small' && 'text-xs',
              size === 'large' && 'text-base',
              bordered && 'border border-border'
            )}
          >
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {columns.map(column => (
                  <TableHead
                    key={column.key}
                    style={{
                      width: column.width,
                      textAlign: column.align || 'left',
                    }}
                    className={cn(
                      column.ellipsis && 'truncate',
                      bordered && 'border-r border-border last:border-r-0',
                      'sticky top-0 z-10' // 让表头固定在顶部
                    )}
                  >
                    {column.title}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataSource.map((record, index) => {
                const rowProps = onRow ? onRow(record, index) : {};
                return (
                  <TableRow
                    key={getRowKey(record, index)}
                    className={cn(
                      'transition-colors duration-150',
                      getRowClassName(record, index),
                      bordered && 'border-b border-border'
                    )}
                    {...rowProps}
                  >
                    {columns.map(column => (
                      <TableCell
                        key={column.key}
                        style={{
                          textAlign: column.align || 'left',
                        }}
                        className={cn(
                          'py-3', // 增加垂直内边距
                          column.ellipsis && 'truncate',
                          bordered && 'border-r border-border last:border-r-0'
                        )}
                      >
                        {column.render
                          ? column.render(record[column.dataIndex], record, index)
                          : record[column.dataIndex]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
);

DataTable.displayName = 'DataTable';

export { DataTable };
export type { DataTableProps, Column };
