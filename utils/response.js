module.exports = {
  op_success: {
    code: 200,
    message: '操作成功',
  },
  op_fail: {
    code: 9999,
    message: '操作失败',
  },
  op: (code, message) => ( { code, message } ),
}
