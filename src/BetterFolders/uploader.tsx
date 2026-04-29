import { React } from "dium";
import { GuildsTreeFolder } from "@dium/modules";
import { FormSwitch } from "@dium/components";
import { FolderData } from "./settings";
import { renderIcon } from "./icon";

export interface BetterFolderUploaderProps extends FolderData {
    folderNode: GuildsTreeFolder;
    onChange(data: FolderData): void;
}

const rowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
    flexWrap: "wrap",
};

const uploadLabelStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 32,
    padding: "0 14px",
    borderRadius: 4,
    border: "1px solid var(--button-outline-brand-border, var(--border-subtle))",
    cursor: "pointer",
};

const previewLabelStyle: React.CSSProperties = {
    color: "var(--text-muted)",
};

export const BetterFolderUploader = ({ icon, always, onChange }: BetterFolderUploaderProps): React.JSX.Element => {
    const onFileChange = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
        const file = currentTarget.files?.[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            if (typeof reader.result === "string") {
                onChange({ icon: reader.result, always });
            }
        });
        reader.readAsDataURL(file);

        currentTarget.value = "";
    };

    return (
        <>
            <div style={rowStyle}>
                <label style={uploadLabelStyle}>
                    <input type="file" accept="image/*" style={{ display: "none" }} onChange={onFileChange} />
                    Upload Image
                </label>
                <span style={previewLabelStyle}>Preview:</span>
                {renderIcon({ icon, always: true })}
            </div>
            <FormSwitch
                checked={always}
                onChange={(checked) => onChange({ icon, always: checked })}
                label="Always display icon"
            />
        </>
    );
};
