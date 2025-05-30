"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/presentation/atoms/button/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MainLayout } from "@/presentation/templates/main-layout";
import { useUser } from "@/context/UserContext";
import AuthViewModel from "@/presentation/pages/auth/AuthViewModel";
import type { UserData } from "@/components/interface/modules/Auth";
import { toast } from "sonner";
import { Eye, EyeOff, Trash } from "lucide-react";

export function ProfileSettings() {
  const { user } = useUser();
  const { updateUser, loading } = AuthViewModel();

  // Estado de los valores editados, inicializado desde el contexto
  const [editValues, setEditValues] = useState<Partial<UserData>>({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    imageUrl: user?.imageUrl,
    // password: "", // Solo si implementas cambio de password
  });
  // Estado de edición por campo
  const [editing, setEditing] = useState({
    name: false,
    phone: false,
    imageUrl: false,
    address: false,
    password: false, // Solo para mostrar el formulario de cambio de contraseña
  });
  // Reemplazar el cálculo de isDirty por:
  const isDirty = React.useMemo(() => {
    // Si algún campo está en modo edición
    if (Object.values(editing).some(Boolean)) return true;
    // Si hay una imagen nueva seleccionada (tipo File)
    if (editValues.imageUrl && typeof editValues.imageUrl !== "string") return true;
    return false;
  }, [editing, editValues]);

  // Handler para el input file oculto
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validación de contraseñas
  const passwordsMatch = newPassword === confirmPassword;
  const showPasswordError = !!(
    editing.password &&
    newPassword &&
    confirmPassword &&
    !passwordsMatch
  );

  // Para restaurar la imagen anterior si se cancela la selección
  const [prevImage, setPrevImage] = useState<string | undefined>(user?.imageUrl);

  const validateFields = (values?: Partial<UserData>) => {
    const v = values || editValues;
    const errors: { [key: string]: string } = {};
    if (!v.name || v.name.length < 3) errors.name = "Name must be at least 3 characters.";
    if (!v.phone || !/^[0-9]{10,15}$/.test(v.phone)) errors.phone = "Phone must be 10-15 digits.";
    if (!v.address || v.address.length < 5)
      errors.address = "Address must be at least 5 characters.";
    return errors;
  };

  const handleProfileImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPrevImage(
        editValues.imageUrl && typeof editValues.imageUrl === "string"
          ? editValues.imageUrl
          : user?.imageUrl
      );
      handleChange("imageUrl", e.target.files[0]);
    }
  };

  // Quitar imagen seleccionada
  const handleRemoveSelectedImage = () => {
    setEditValues((prev) => ({
      ...prev,
      imageUrl: prevImage || undefined,
    }));
  };

  // Handlers para editar/cancelar
  const handleEdit = (field: keyof typeof editing) => {
    setEditing({ ...editing, [field]: true });
  };
  const handleCancel = (field: keyof typeof editing) => {
    if (field === "password") {
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError(null);
      setEditing({ ...editing, password: false });
      return;
    }
    setEditValues({ ...editValues, [field]: user?.[field as keyof UserData] });
    setEditing({ ...editing, [field]: false });
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };
  const handleChange = (field: keyof typeof editValues, value: string | File) => {
    setEditValues((prev) => {
      const updated = { ...prev, [field]: value };
      // Validar en tiempo real
      const errors = validateFields(updated);
      setFieldErrors(errors);
      return updated;
    });
  };

  // Handler para guardar cambios
  const handleSave = async () => {
    if (!user) return;
    const errors = validateFields();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    // Validación de contraseña
    if (editing.password) {
      if (newPassword.length < 8) {
        setPasswordError("The password must be at least 8 characters long.");
        return;
      }
      if (!passwordsMatch) {
        setPasswordError("The passwords do not match.");
        return;
      }
    }
    // Construir payload
    const payload: any = { ...editValues };
    if (editing.password && newPassword.length >= 8 && newPassword === confirmPassword) {
      payload.password = newPassword;
    }
    let updatedUserData = null;
    try {
      const result = await toast.promise(
        updateUser(user.id, { ...payload, password: editing.password ? newPassword : undefined }),
        {
          loading: "Saving changes...",
          success: (result) =>
            result && result.success
              ? "¡Profile updated successfully!"
              : result?.message || "Failed to update profile.",
          error: (error) => error?.message || "Error updating profile.",
        }
      );
      const apiResult =
        result as unknown as import("@/components/interface/modules/Auth").UpdateUserApiResponse;
      if (apiResult && apiResult.success && apiResult.data && apiResult.data[0]) {
        updatedUserData = apiResult.data[0];
      }
    } finally {
      const finalUser = updatedUserData ?? user;
      setEditValues({
        name: finalUser?.name ?? "",
        phone: finalUser?.phone ?? "",
        address: finalUser?.address ?? "",
        imageUrl: finalUser?.imageUrl,
      });
      setPrevImage(finalUser?.imageUrl);
      setFieldErrors({});
      setPasswordError(null);
      setNewPassword("");
      setConfirmPassword("");
      setEditing({ name: false, phone: false, imageUrl: false, address: false, password: false });
    }
  };

  // Render helpers
  const renderField = (label: string, field: keyof typeof editing, type: string = "text") => (
    <div className="bg-gray-50 rounded-lg px-7 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-md">
      <div className="text-center sm:text-left w-full">
        <p className="font-medium text-gray-800">{label}</p>
        {editing[field] ? (
          field === "imageUrl" ? (
            <>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleProfileImageChange}
                disabled={loading}
              />
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14 bg-gradient-to-r from-[#abd45a] via-[#39cac0] to-[#abd45a]">
                  <AvatarImage
                    src={
                      editValues.imageUrl && typeof editValues.imageUrl !== "string"
                        ? URL.createObjectURL(editValues.imageUrl as File)
                        : user?.imageUrl
                    }
                    alt="User Avatar"
                  />
                  <AvatarFallback className="text-white font-bold">U</AvatarFallback>
                </Avatar>
                {/* Botón para quitar imagen seleccionada */}
                {editValues.imageUrl && typeof editValues.imageUrl !== "string" && (
                  <button
                    type="button"
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs font-bold transition-all"
                    onClick={handleRemoveSelectedImage}
                    disabled={loading}
                  >
                    <Trash size={16} /> Remove
                  </button>
                )}
              </div>
            </>
          ) : field === "name" || field === "phone" || field === "address" ? (
            <div className="flex flex-col gap-2 mt-1 relative w-full max-w-xs">
              <input
                type={type}
                value={editValues[field] as string}
                onChange={(e) => handleChange(field, e.target.value)}
                className={`border rounded px-2 py-1 w-full pr-2 ${fieldErrors[field] ? "border-red-500" : "border-input"}`}
                disabled={loading}
                {...(field === "phone"
                  ? {
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (!/[0-9]/.test(e.key)) e.preventDefault();
                      },
                    }
                  : {})}
              />
              {fieldErrors[field] && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors[field]}</p>
              )}
            </div>
          ) : null
        ) : field === "imageUrl" ? (
          <Avatar className="h-14 w-14 bg-gradient-to-r from-[#abd45a] via-[#39cac0] to-[#abd45a]">
            <AvatarImage
              src={
                editValues.imageUrl && typeof editValues.imageUrl !== "string"
                  ? URL.createObjectURL(editValues.imageUrl as File)
                  : user?.imageUrl
              }
              alt="User Avatar"
            />
            <AvatarFallback className="text-white font-bold">U</AvatarFallback>
          </Avatar>
        ) : field === "name" || field === "phone" || field === "address" ? (
          <>
            <p className="text-sm text-gray-500">{user?.[field]}</p>
            {fieldErrors[field] && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors[field]}</p>
            )}
          </>
        ) : null}
      </div>
      <Button
        variant="outline"
        className={`rounded-full ${editing[field] ? "bg-red-600 hover:bg-red-700" : "bg-[#abd45a] hover:bg-[#9bc04e]"} text-white border-0 hover:text-white hover:shadow-[0_0_15px_rgba(171,212,90,0.7)] px-5 py-1 font-bold text-[14px] h-8 transition-all flex items-center justify-center`}
        onClick={() => (editing[field] ? handleCancel(field) : handleEdit(field))}
        disabled={loading}
      >
        {editing[field] ? "Cancel" : "Change"}
      </Button>
    </div>
  );

  const renderPasswordFields = () => (
    <div className="bg-gray-50 rounded-lg px-7 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-md">
      <div className="text-center sm:text-left w-full">
        <p className="font-medium text-gray-800">Password</p>
        {editing.password ? (
          <div className="flex flex-col gap-2 mt-1 relative">
            <div className="relative w-full max-w-xs">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (e.target.value.length < 8)
                    setPasswordError("The password must be at least 8 characters long.");
                  else if (confirmPassword && e.target.value !== confirmPassword)
                    setPasswordError("The passwords do not match.");
                  else setPasswordError(null);
                }}
                className={`border rounded px-2 py-1 w-full pr-12 ${passwordError ? "border-red-500" : ""}`}
                placeholder="New password"
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowNewPassword((v) => !v)}
                tabIndex={-1}
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="relative w-full max-w-xs">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (newPassword.length < 8)
                    setPasswordError("The password must be at least 8 characters long.");
                  else if (newPassword && e.target.value !== newPassword)
                    setPasswordError("The passwords do not match.");
                  else setPasswordError(null);
                }}
                className={`border rounded px-2 py-1 w-full pr-12 ${passwordError ? "border-red-500" : ""}`}
                placeholder="Confirm new password"
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowConfirmPassword((v) => !v)}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
          </div>
        ) : (
          <p className="text-sm text-gray-500">**********</p>
        )}
      </div>
      <Button
        variant="outline"
        className="rounded-full bg-[#abd45a] text-white border-0 hover:bg-[#9bc04e] hover:text-white hover:shadow-[0_0_15px_rgba(171,212,90,0.7)] px-5 py-1 font-bold text-[14px] h-8 transition-all flex items-center justify-center"
        onClick={() => (editing["password"] ? handleCancel("password") : handleEdit("password"))}
        disabled={loading}
      >
        {editing["password"] ? "Cancel" : "Change"}
      </Button>
    </div>
  );

  useEffect(() => {
    // Si no hay ningún campo en edición y no hay imagen pendiente, resetea editValues al usuario actual
    if (
      !Object.values(editing).some(Boolean) &&
      (!editValues.imageUrl || typeof editValues.imageUrl === "string")
    ) {
      setEditValues({
        name: user?.name || "",
        phone: user?.phone || "",
        address: user?.address || "",
        imageUrl: user?.imageUrl,
      });
      setPrevImage(user?.imageUrl);
    }
  }, [editing, user]);

  return (
    <MainLayout>
      <div className="bg-gray-100 p-4 sm:p-8 mt-[70px] sm:mt-[60px] lg:mt-0">
        <div className="mx-auto w-full bg-white rounded-lg shadow-md p-6 sm:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Account Info</h1>
          </div>

          {/* My Profile Section */}
          <section className="mb-6 flex-shrink-0">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">My Profile</h2>
            <div className="bg-gray-50 rounded-lg px-7 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 bg-gradient-to-r from-[#abd45a] via-[#39cac0] to-[#abd45a]">
                  <AvatarImage
                    src={
                      editValues.imageUrl && typeof editValues.imageUrl !== "string"
                        ? URL.createObjectURL(editValues.imageUrl as File)
                        : user?.imageUrl
                    }
                    alt="User Avatar"
                  />
                  <AvatarFallback className="text-white font-bold">U</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-800">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                {/* Botón para quitar imagen seleccionada en la vista principal */}
                {editValues.imageUrl && typeof editValues.imageUrl !== "string" && (
                  <button
                    type="button"
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs font-bold transition-all ml-2"
                    onClick={handleRemoveSelectedImage}
                    disabled={loading}
                  >
                    <Trash size={16} /> Remove
                  </button>
                )}
              </div>
              <>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleProfileImageChange}
                />
                <Button
                  variant="outline"
                  className="rounded-full bg-[#abd45a] text-white border-0 hover:bg-[#9bc04e] hover:text-white hover:shadow-[0_0_15px_rgba(171,212,90,0.7)] px-5 py-1 font-bold text-[14px] h-8 transition-all flex items-center justify-center"
                  onClick={handleProfileImageClick}
                  disabled={loading}
                >
                  Change Profile Image
                </Button>
              </>
            </div>
          </section>

          {/* Account Details Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-3 flex-shrink-0">
              Account Details
            </h2>
            <div className="space-y-3">
              {renderField("Name", "name")}
              {renderField("Phone", "phone")}
              {renderField("Address", "address")}
              {/* Newsletter Preferences Row (no funcionalidad) */}
              <div className="bg-gray-50 rounded-lg px-7 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-md">
                <div className="text-center sm:text-left">
                  <p className="font-medium text-gray-800">Newsletter Preferences</p>
                  <p className="text-sm text-gray-500">Active</p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full bg-[#9bc04e] text-white border-0 hover:bg-[#9bc04e] hover:text-white hover:shadow-[0_0_15px_rgba(171,212,90,0.7)] px-5 py-1 font-bold text-[14px] h-8 transition-all flex items-center justify-center"
                  disabled
                >
                  Change
                </Button>
              </div>
              {renderPasswordFields()}
            </div>
            {/* Botón Guardar Cambios */}
            {(isDirty || loading) && (
              <div className="flex justify-end mt-6">
                <Button
                  className="bg-[#abd45a] text-white rounded-full px-8 py-2 font-bold text-lg shadow-md hover:bg-[#9bc04e] transition-all"
                  onClick={handleSave}
                  disabled={
                    loading ||
                    showPasswordError ||
                    (editing.password && newPassword.length < 8) ||
                    Object.values(fieldErrors).some(Boolean) ||
                    !editValues.name ||
                    !editValues.phone ||
                    !editValues.address
                  }
                >
                  {loading ? (
                    <span className="flex items-center">
                      <span className="loader mr-2"></span>Saving...
                    </span>
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </div>
            )}
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

export default ProfileSettings;
