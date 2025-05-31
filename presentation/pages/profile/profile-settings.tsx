"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/presentation/atoms/button/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MainLayout } from "@/presentation/templates/main-layout";
import { useUser } from "@/context/UserContext";
import AuthViewModel from "@/presentation/pages/auth/AuthViewModel";
import type { UserData } from "@/components/interface/modules/Auth";
import { toast } from "sonner";
import { Eye, EyeOff, Trash } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export function ProfileSettings() {
  const { user } = useUser();
  const { updateUser, loading } = AuthViewModel();
  const [mounted, setMounted] = useState(false);
  const [editing, setEditing] = useState<{
    [key: string]: boolean;
    name: boolean;
    phone: boolean;
    imageUrl: boolean;
    address: boolean;
    password: boolean;
  }>({
    name: false,
    phone: false,
    imageUrl: false,
    address: false,
    password: false,
  });
  const [prevImage, setPrevImage] = useState<string | undefined>(user?.imageUrl);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && user && user.error) {
      toast.error(
        "There was an error retrieving your user data. Please contact support or try again later."
      );
    }
  }, [mounted, user]);

  // Imagen
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageUrl = useMemo(() => {
    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }
    return undefined;
  }, [imageFile]);
  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  // Formik setup
  const validate = (values: any) => {
    const errors: any = {};
    if (!values.name || values.name.length < 3) errors.name = "Name must be at least 3 characters.";
    if (!values.phone || !/^[0-9]{10,15}$/.test(values.phone))
      errors.phone = "Phone must be 10-15 digits.";
    if (!values.address || values.address.length < 5)
      errors.address = "Address must be at least 5 characters.";
    return errors;
  };

  // Imagen handlers
  const handleProfileImageClick = () => fileInputRef.current?.click();
  // handleProfileImageChange y handleRemoveSelectedImage se moverán dentro del render de Formik para acceder a setFieldValue

  // Defino la función para submit fuera del TSX
  const handleProfileSubmit = async (
    values: any,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (v: boolean) => void; resetForm: (v: any) => void }
  ) => {
    if (editing.password) {
      if (newPassword.length < 8) {
        setPasswordError("The password must be at least 8 characters long.");
        setSubmitting(false);
        return;
      }
      if (newPassword !== confirmPassword) {
        setPasswordError("The passwords do not match.");
        setSubmitting(false);
        return;
      }
    }
    const payload: any = { ...values };
    if (imageFile) payload.imageUrl = imageFile;
    if (editing.password && newPassword.length >= 8 && newPassword === confirmPassword) {
      payload.password = newPassword;
    }
    let updatedUserData = null;
    try {
      const result = await toast.promise(updateUser(user!.id, payload), {
        loading: "Saving changes...",
        success: (result) =>
          result && result.success
            ? "¡Profile updated successfully!"
            : result?.message || "Failed to update profile.",
        error: (error) => error?.message || "Error updating profile.",
      });
      const apiResult =
        result as unknown as import("@/components/interface/modules/Auth").UpdateUserApiResponse;
      if (apiResult && apiResult.success && apiResult.data && apiResult.data[0]) {
        updatedUserData = apiResult.data[0];
      }
    } finally {
      const finalUser = updatedUserData ?? user;
      resetForm({
        values: {
          name: finalUser?.name ?? "",
          phone: finalUser?.phone ?? "",
          address: finalUser?.address ?? "",
          imageUrl: finalUser?.imageUrl,
        },
      });
      setPrevImage(finalUser?.imageUrl);
      setPasswordError(null);
      setNewPassword("");
      setConfirmPassword("");
      setEditing({ name: false, phone: false, imageUrl: false, address: false, password: false });
      setImageFile(null);
      setSubmitting(false);
    }
  };

  // MemoField fuera del render de Formik
  const MemoField = ({
    label,
    field,
    type = "text",
    editing,
    loading,
    handleEdit,
    handleCancel,
  }: {
    label: string;
    field: string;
    type?: string;
    editing: any;
    loading: boolean;
    handleEdit: (field: string) => void;
    handleCancel: (field: string) => void;
  }) => {
    if (field === "password" || field === "imageUrl") return null;
    return (
      <div className="bg-gray-50 rounded-lg px-7 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-md">
        <div className="text-center sm:text-left w-full">
          <p className="font-medium text-gray-800">{label}</p>
          <div className="flex flex-col gap-2 mt-1 relative w-full max-w-xs">
            <Field
              name={field}
              type={type}
              as="input"
              className={`w-full pr-2 ${
                editing[field]
                  ? "border rounded px-2 py-1 bg-white text-gray-900"
                  : "border-none bg-transparent text-gray-500 cursor-default p-0 m-0 focus:outline-none focus:ring-0 shadow-none select-text"
              } ${loading ? "opacity-60" : ""}`}
              disabled={loading}
              readOnly={!editing[field]}
              tabIndex={editing[field] ? 0 : -1}
              style={
                !editing[field]
                  ? {
                      pointerEvents: "none",
                      minHeight: 0,
                      minWidth: 0,
                      height: "auto",
                      fontWeight: 400,
                      fontSize: "1rem",
                      lineHeight: "1.5",
                      background: "none",
                      border: "none",
                      boxShadow: "none",
                      padding: 0,
                      margin: 0,
                    }
                  : {}
              }
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
            {editing[field] && (
              <ErrorMessage name={field} component="p" className="text-red-500 text-xs mt-1" />
            )}
          </div>
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
  };

  // Imagen de perfil
  const MemoAvatar = () => (
    <Avatar className="h-14 w-14 bg-gradient-to-r from-[#abd45a] via-[#39cac0] to-[#abd45a]">
      <AvatarImage src={imageUrl || user?.imageUrl} alt="User Avatar" />
      <AvatarFallback className="text-white font-bold">U</AvatarFallback>
    </Avatar>
  );

  return (
    <MainLayout>
      <div className="bg-gray-100 p-4 sm:p-8 sm:mt-[60px] lg:mt-0">
        <div className="mx-auto w-full bg-white rounded-lg shadow-md p-6 sm:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Account Info</h1>
          </div>

          <Formik
            initialValues={{
              name: user?.name || "",
              phone: user?.phone || "",
              address: user?.address || "",
              imageUrl: user?.imageUrl || undefined,
            }}
            validate={validate}
            enableReinitialize
            onSubmit={handleProfileSubmit}
          >
            {({ isSubmitting, dirty, values, errors, setFieldValue }) => {
              // Edición/cancelación y handlers de imagen dentro del render para acceso a setFieldValue
              const handleEdit = (field: string) =>
                setEditing((prev: typeof editing) => ({ ...prev, [field]: true }));
              const handleCancel = (field: string) => {
                if (field === "password") {
                  setNewPassword("");
                  setConfirmPassword("");
                  setPasswordError(null);
                  setEditing((prev) => ({ ...prev, password: false }));
                  return;
                }
                setFieldValue(field, user?.[field as keyof UserData] || "");
                setEditing((prev) => ({ ...prev, [field]: false }));
              };
              const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files[0]) {
                  setPrevImage(
                    typeof values.imageUrl === "string"
                      ? values.imageUrl
                      : typeof user?.imageUrl === "string"
                        ? user?.imageUrl
                        : undefined
                  );
                  setImageFile(e.target.files[0]);
                  setFieldValue("imageUrl", e.target.files[0]);
                }
              };
              const handleRemoveSelectedImage = () => {
                setImageFile(null);
                setFieldValue("imageUrl", prevImage || undefined);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              };
              // Render password fields aquí:
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
                                setPasswordError(
                                  "The password must be at least 8 characters long."
                                );
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
                                setPasswordError(
                                  "The password must be at least 8 characters long."
                                );
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
                        {passwordError && (
                          <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">**********</p>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full bg-[#abd45a] text-white border-0 hover:bg-[#9bc04e] hover:text-white hover:shadow-[0_0_15px_rgba(171,212,90,0.7)] px-5 py-1 font-bold text-[14px] h-8 transition-all flex items-center justify-center"
                    onClick={() =>
                      editing["password"] ? handleCancel("password") : handleEdit("password")
                    }
                    disabled={loading}
                  >
                    {editing["password"] ? "Cancel" : "Change"}
                  </Button>
                </div>
              );
              return (
                <Form>
                  {/* My Profile Section */}
                  <section className="mb-6 flex-shrink-0">
                    <h2 className="text-xl font-semibold text-gray-700 mb-3">My Profile</h2>
                    <div className="bg-gray-50 rounded-lg px-7 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                      <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                        <MemoAvatar />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 truncate">{user?.name}</p>
                          <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                        </div>
                        {/* Botón para quitar imagen seleccionada en la vista principal */}
                        {imageFile && (
                          <button
                            type="button"
                            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs font-bold transition-all ml-0 sm:ml-2 w-full sm:w-auto justify-center mt-3 sm:mt-0"
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
                          type="button"
                          variant="outline"
                          className="rounded-full bg-[#abd45a] text-white border-0 hover:bg-[#9bc04e] hover:text-white hover:shadow-[0_0_15px_rgba(171,212,90,0.7)] px-5 py-1 font-bold text-[14px] h-8 transition-all flex items-center justify-center mt-3 sm:mt-0 w-full sm:w-auto"
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
                      <MemoField
                        label="Name"
                        field="name"
                        editing={editing}
                        loading={loading}
                        handleEdit={handleEdit}
                        handleCancel={handleCancel}
                      />
                      <MemoField
                        label="Phone"
                        field="phone"
                        editing={editing}
                        loading={loading}
                        handleEdit={handleEdit}
                        handleCancel={handleCancel}
                      />
                      <MemoField
                        label="Address"
                        field="address"
                        editing={editing}
                        loading={loading}
                        handleEdit={handleEdit}
                        handleCancel={handleCancel}
                      />
                      {/* Newsletter Preferences Row (no funcionalidad) */}
                      <div className="bg-gray-50 rounded-lg px-7 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-md mt-3 sm:mt-0">
                        <div className="text-center sm:text-left w-full">
                          <p className="font-medium text-gray-800">Newsletter Preferences</p>
                          <p className="text-sm text-gray-500">Active</p>
                        </div>
                        <Button
                          variant="outline"
                          className="rounded-full bg-[#9bc04e] text-white border-0 hover:bg-[#9bc04e] hover:text-white hover:shadow-[0_0_15px_rgba(171,212,90,0.7)] px-5 py-1 font-bold text-[14px] h-8 transition-all flex items-center justify-center mt-3 sm:mt-0 w-full sm:w-auto"
                          disabled
                        >
                          Change
                        </Button>
                      </div>
                      {renderPasswordFields()}
                    </div>
                    {/* Botón Guardar Cambios */}
                    {(dirty ||
                      loading ||
                      (editing.password &&
                        newPassword.length >= 8 &&
                        confirmPassword.length >= 8 &&
                        newPassword === confirmPassword &&
                        !passwordError)) && (
                      <div className="flex justify-center sm:justify-end mt-6">
                        <Button
                          className="bg-[#abd45a] text-white rounded-full px-8 py-2 font-bold text-lg shadow-md hover:bg-[#9bc04e] transition-all w-full sm:w-auto"
                          type="submit"
                          disabled={
                            Boolean(loading) ||
                            Boolean(passwordError) ||
                            (editing.password && newPassword.length < 8) ||
                            Object.keys(errors).length > 0 ||
                            !values.name ||
                            !values.phone ||
                            !values.address
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
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </MainLayout>
  );
}

export default ProfileSettings;
