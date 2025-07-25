# InfloWave 功能测试计划

## 概述

本文档详细说明了InfloWave应用的功能测试方案，包括自动化测试工具的使用方法和手动测试检查清单。

## 测试架构

### 1. 自动化测试工具

我们开发了三个主要的测试工具：

- **功能测试器** (`featureTest.ts`): 测试后端API调用和核心功能
- **UI交互测试器** (`uiInteractionTest.ts`): 测试前端界面交互
- **主测试运行器** (`masterTestRunner.ts`): 整合所有测试的统一入口

### 2. 测试执行方法

#### 方法一：浏览器控制台执行

1. 打开InfloWave应用
2. 打开浏览器开发者工具 (F12)
3. 切换到Console标签
4. 运行测试命令：

```javascript
// 运行完整测试套件
await runCompleteTests();

// 运行快速健康检查
await quickHealthCheck();

// 单独运行UI测试
await runUITests();

// 单独运行功能测试
await runFeatureTests();
```

#### 方法二：代码中导入执行

```typescript
import { masterTestRunner } from '@/utils/masterTestRunner';

// 在组件中运行测试
const runTests = async () => {
  const report = await masterTestRunner.runCompleteTestSuite();
  console.log('测试完成:', report);
};
```

## 测试分类

### 1. 核心功能测试

#### 1.1 连接管理

- [ ] 获取连接列表
- [ ] 创建新连接
- [ ] 测试连接
- [ ] 删除连接
- [ ] 连接状态监控

#### 1.2 数据库操作

- [ ] 获取数据库列表
- [ ] 获取数据库结构
- [ ] 获取表信息
- [ ] 获取字段信息

#### 1.3 查询功能

- [ ] 查询执行
- [ ] 查询历史
- [ ] 保存查询
- [ ] 查询导出

### 2. UI交互测试

#### 2.1 工具栏功能

- [ ] 仪表板按钮点击
- [ ] 连接管理按钮点击
- [ ] 数据查询按钮点击
- [ ] 数据库管理按钮点击
- [ ] 数据可视化按钮点击
- [ ] 性能监控按钮点击

#### 2.2 用户菜单

- [ ] 菜单触发器点击
- [ ] 下拉菜单显示
- [ ] 主题切换选项
- [ ] 语言设置选项
- [ ] 应用设置选项

#### 2.3 键盘快捷键

- [ ] Ctrl+1 (仪表板)
- [ ] Ctrl+2 (连接管理)
- [ ] Ctrl+3 (数据查询)
- [ ] Ctrl+4 (数据库管理)
- [ ] Ctrl+N (新建查询)
- [ ] Ctrl+Shift+P (全局搜索)

#### 2.4 页面导航

- [ ] 路由跳转功能
- [ ] 页面状态保持
- [ ] 浏览器历史记录

### 3. 数据管理测试

#### 3.1 数据导入

- [ ] 文件格式检测
- [ ] 数据预览
- [ ] 导入配置
- [ ] 导入执行

#### 3.2 数据导出

- [ ] CSV导出
- [ ] JSON导出
- [ ] Excel导出
- [ ] 自定义格式导出

#### 3.3 数据可视化

- [ ] 图表渲染
- [ ] 图表配置
- [ ] 仪表板创建
- [ ] 仪表板管理

### 4. 性能监控测试

#### 4.1 性能指标

- [ ] 系统资源监控
- [ ] 数据库性能指标
- [ ] 查询性能分析
- [ ] 慢查询检测

#### 4.2 实时监控

- [ ] 实时数据更新
- [ ] 监控图表
- [ ] 告警功能

### 5. 用户体验测试

#### 5.1 界面响应

- [ ] 按钮点击响应
- [ ] 表单提交响应
- [ ] 页面切换速度
- [ ] 数据加载状态

#### 5.2 错误处理

- [ ] 网络错误处理
- [ ] 输入验证
- [ ] 错误信息显示
- [ ] 错误恢复机制

## 手动测试检查清单

### 启动和初始化

- [ ] 应用正常启动
- [ ] 加载画面显示
- [ ] 初始化消息正常
- [ ] 主界面正确显示

### 连接管理页面

- [ ] 连接列表显示
- [ ] 添加连接按钮
- [ ] 连接状态指示器
- [ ] 连接操作菜单

### 数据查询页面

- [ ] SQL编辑器显示
- [ ] 语法高亮
- [ ] 自动补全
- [ ] 查询结果显示

### 数据库管理页面

- [ ] 数据库树形结构
- [ ] 表结构显示
- [ ] 数据预览
- [ ] 右键菜单

### 数据可视化页面

- [ ] 图表类型选择
- [ ] 数据源配置
- [ ] 图表预览
- [ ] 保存和导出

### 性能监控页面

- [ ] 实时指标显示
- [ ] 历史数据图表
- [ ] 监控配置
- [ ] 告警设置

### 应用设置页面

- [ ] 主题设置
- [ ] 语言设置
- [ ] 连接设置
- [ ] 用户偏好

## 测试执行流程

### 1. 准备阶段

1. 确保应用正常启动
2. 确保所有必要的依赖已安装
3. 确保有可用的测试数据库连接

### 2. 执行阶段

1. 运行快速健康检查
2. 运行完整的自动化测试套件
3. 执行手动测试检查清单
4. 记录测试结果

### 3. 结果分析

1. 分析测试报告
2. 识别失败的测试用例
3. 记录问题和Bug
4. 制定修复计划

## 测试报告

### 自动化测试报告

测试工具会生成详细的JSON格式报告，包含：

- 测试用例执行结果
- 性能指标
- 错误信息
- 统计数据

### 手动测试报告

建议使用以下格式记录手动测试结果：

```
测试日期: [日期]
测试人员: [姓名]
应用版本: [版本号]

测试结果:
✅ 通过
❌ 失败
⚠️  部分通过

详细说明:
[具体的测试步骤和结果]
```

## 问题追踪

### 常见问题类型

1. **按钮无响应**: 检查事件监听器和路由配置
2. **页面无法加载**: 检查路由配置和组件导入
3. **数据无法显示**: 检查API调用和数据处理
4. **样式问题**: 检查CSS类名和样式文件

### 调试建议

1. 使用浏览器开发者工具
2. 检查控制台错误信息
3. 验证网络请求
4. 检查React组件状态

## 持续改进

### 测试自动化

- 集成CI/CD流程
- 定期执行回归测试
- 监控测试覆盖率

### 测试优化

- 优化测试执行速度
- 增加测试用例覆盖率
- 改进测试报告格式

### 质量保证

- 代码审查
- 性能测试
- 安全测试
- 用户体验测试

---

## 快速开始

1. 克隆项目并启动应用
2. 打开浏览器开发者工具
3. 在控制台运行: `await quickHealthCheck()`
4. 如果健康检查通过，运行: `await runCompleteTests()`
5. 查看测试报告并分析结果

更多详细信息请参考项目文档和源代码注释。
