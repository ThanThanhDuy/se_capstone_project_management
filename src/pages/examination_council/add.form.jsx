import {
  Button,
  Form,
  Input,
  Typography,
  DatePicker,
  TimePicker,
  Select,
  Space,
} from "antd";
import React, { useState } from "react";
import moment from "moment";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 16,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 16,
    },
    sm: {
      span: 12,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const { RangePicker } = DatePicker;
const { Option } = Select;

const DEFAULT_OBJECT = {
  datetime: null,
  schedules: [
    {
      start_at: null,
      end_at: null,
      capstone_team_id: null,
    },
  ],
  location: null,
};

const AddForm = () => {
  const [_form] = Form.useForm();
  const [_teachers, _setTeachers] = useState([]);
  const [_slots, _setSlots] = useState([DEFAULT_OBJECT]);
  // submit when input success
  const _onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  //check time to disable
  const _disalbleDate = (current) => {
    return current <= moment();
  };

  //handle onchange
  const _handleChangeDatePicker = (event, key) => {
    console.log(event);
    console.log(key);
    let newSlots = [..._slots];
    newSlots[key].datetime = event.toDate();
    _setSlots(newSlots);
  };
  return (
    <Form
      {...formItemLayout}
      form={_form}
      name="register"
      onFinish={_onFinish}
      scrollToFirstError
    >
      <div>
        <div className="member_add">
          <Typography.Title
            level={5}
            style={{
              margin: 0,
              marginBottom: 20,
            }}
          >
            Chủ tịch hội đồng:
          </Typography.Title>
          <Form.Item
            name="president_code"
            label="Mã định danh"
            rules={[
              {
                required: true,
                message: "Vui lòng điền mã định danh!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="president_name"
            label="Họ và tên"
            rules={[
              {
                required: true,
                message: "Vui lòng điền tên thành viên hội đồng!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="member_add">
          <Typography.Title
            level={5}
            style={{
              margin: 0,
            }}
          >
            Thư ký:
          </Typography.Title>
          <Form.Item
            name="secretatry_code"
            label="Mã định danh"
            rules={[
              {
                required: true,
                message: "Vui lòng điền mã định danh!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="secretary_name"
            label="Họ và tên"
            rules={[
              {
                required: true,
                message: "Vui lòng điền tên thành viên hội đồng!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="member_add">
          <Typography.Title
            level={5}
            style={{
              margin: 0,
              marginBottom: 20,
            }}
          >
            Thành viên:
          </Typography.Title>
          <Form.Item
            name="member_1st_code"
            label="Mã định danh"
            rules={[
              {
                required: true,
                message: "Vui lòng điền mã định danh!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="member_1st_name"
            label="Họ và tên"
            rules={[
              {
                required: true,
                message: "Vui lòng điền tên thành viên hội đồng!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="member_add">
          <Typography.Title
            level={5}
            style={{
              margin: 0,
              marginBottom: 20,
            }}
          >
            Thành viên:
          </Typography.Title>
          <Form.Item
            name="member_2nd_code"
            label="Mã định danh"
            rules={[
              {
                required: true,
                message: "Vui lòng điền mã định danh!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="member_2nd_name"
            label="Họ và tên"
            rules={[
              {
                required: true,
                message: "Vui lòng điền tên thành viên hội đồng!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="member_add">
          <Typography.Title level={5}>Thành viên:</Typography.Title>
          <Form.Item
            name="member_3rd_code"
            label="Mã định danh"
            rules={[
              {
                required: true,
                message: "Vui lòng điền mã định danh!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="member_3rd_name"
            label="Họ và tên"
            rules={[
              {
                required: true,
                message: "Vui lòng điền tên thành viên hội đồng!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
      </div>
      <div className="pick_capstone">
        <Typography.Title
          level={5}
          style={{
            margin: 0,
            marginBottom: 20,
          }}
        >
          Tạo lịch bảo vệ đồ án:
        </Typography.Title>
        {/* render time to choose */}
        {_slots.map((slot, key) => {
          return (
            <div key={key}>
              <div>
                <div>
                  <Form.Item>
                    <DatePicker
                      disabledDate={_disalbleDate}
                      onChange={(event) => _handleChangeDatePicker(event, key)}
                    />
                  </Form.Item>

                  {/* add them location */}
                </div>
                {slot.datetime === null ? (
                  <div />
                ) : (
                  <div>
                    <div>Chọn thời gian và team đồ án</div>
                    <div className="block_hourse">
                      <Space>
                        <TimePicker.RangePicker />
                        <Input />
                      </Space>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Tạo mới
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddForm;
