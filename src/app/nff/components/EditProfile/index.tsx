import { useEffect, useState } from "react";
import { Modal, Upload, message } from "antd";
import { CameraOutlined, DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import classNames from "classnames";

import cs from "./index.module.scss";

import FullName from "./FullName";
import Introduction from "./Introduction";

import useUserType from "@/hooks/useUserType";
import { setAccountInfo } from "@/hooks/useData";

interface Props {
  isShow: boolean;
  onClose: () => void;
}

// 为了回显
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export default function EditProfile(props: Props) {
  const { userInfo, token, updateAccountInfo } = useUserType();
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [uploadFile, setUploadFile] = useState({ photo: null, back: null, photoType: "", backType: "" }); // 待上传的文件

  const [loading, setLoading] = useState(false);

  /** 上传背景图 **/
  const [imageUrl, setImageUrl] = useState<string>("");

  /** 上传头像 **/
  const [photoUrl, setPhotoUrl] = useState<string>("");

  // 每次出现时，先把默认值附上去
  useEffect(() => {
    if (props.isShow) {
      setPhotoUrl(userInfo.avatar || "");
      setImageUrl(userInfo.cover_photo || "");
      setFullName(userInfo.username || "");
      setBio(userInfo.bio || "");
      setUploadFile({ photo: null, back: null, photoType: "", backType: "" });
    }
  }, [props.isShow]);

  // 上传前检查格式
  const beforeUpload = (file: RcFile, type: string) => {
    const isTypeOk = ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(file.type);
    if (!isTypeOk) {
      message.error("You can only upload JPG/PNG/GIF file!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      return false;
    }

    setUploadFile(prev => {
      return { ...prev, [type]: file, [`${type}Type`]: file.type.replace("image/", "") };
    });
    return false;
  };

  // 选择的图片改变时 回显
  useEffect(() => {
    if (uploadFile.back) {
      getBase64(uploadFile.back, (base64: string) => setImageUrl(base64));
    }
    if (uploadFile.photo) {
      getBase64(uploadFile.photo, (base64: string) => setPhotoUrl(base64));
    }
  }, [uploadFile.back, uploadFile.photo]);

  // 删除原图
  const onDel = () => {
    setImageUrl("");
    setUploadFile(prev => ({ ...prev, back: null }));
  };

  function buildModalBody() {
    return (
      <div className={cs.root}>
        <div className={cs.control}>
          <i className={classNames("iconfont icon-close", cs.close)} onClick={handleCancel} />
          <span className={cs.title}>Edit Profile</span>
          <div className={classNames("btn", cs.submit)} onClick={handleOk}>
            Save {loading && <LoadingOutlined style={{ marginLeft: "4px" }} />}
          </div>
        </div>
        <div className={cs.cover}>
          <div className={cs.back}>
            {!!imageUrl && <img className={cs.backImg} src={imageUrl} alt="back" />}

            <div className={cs.operation}>
              <Upload beforeUpload={file => beforeUpload(file, "back")} showUploadList={false} disabled={loading}>
                <div className={cs.editBtn}>{<CameraOutlined />}</div>
              </Upload>

              <div className={cs.editBtn} onClick={onDel}>
                <DeleteOutlined />
              </div>
            </div>
          </div>
        </div>
        <div className={cs.headPhoto}>
          {!!photoUrl && <img className={cs.photoBox} src={photoUrl} alt="photo" />}

          <Upload beforeUpload={file => beforeUpload(file, "photo")} showUploadList={false} disabled={loading}>
            <div className={cs.editBtn}>{<CameraOutlined />}</div>
          </Upload>
        </div>
        <div className={cs.wordsBox}>
          <FullName v={fullName} onInput={setFullName} />
          <Introduction v={bio} onInput={setBio} />
        </div>
      </div>
    );
  }

  async function handleOk() {
    if (loading) return;
    setLoading(true);
    const res: any = await setAccountInfo(token, {
      username: fullName,
      bio: bio,
      avatar: uploadFile.photo,
      cover_photo: uploadFile.back,
      photoType: uploadFile.photoType,
      backType: uploadFile.backType,
    });
    setLoading(false);
    if (res.code === 200) {
      updateAccountInfo(res.data);
      message.success("update success");
    } else {
      message.error("update error, please try again");
    }
    props.onClose();
  }

  function handleCancel() {
    props.onClose();
  }

  return <Modal visible={props.isShow} modalRender={() => buildModalBody()} className={"modal-self"} />;
}
