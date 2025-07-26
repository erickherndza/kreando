from src.models.user import db

class Template(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    preview_image_url = db.Column(db.String(255))
    grapesjs_json = db.Column(db.JSON)  # Estructura JSON de GrapesJS para la plantilla
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def __repr__(self):
        return f'<Template {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'preview_image_url': self.preview_image_url,
            'grapesjs_json': self.grapesjs_json,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

